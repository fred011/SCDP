import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, MapPin } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useToast } from "../../components/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { districtsByProvince, municipalitiesByDistrict, provinces } from "../../data/south-african-locations";

// Step 3: Profile Completion Schema 
const profileSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  race: z.string().optional(),
  idPassport: z.string().optional(),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  municipality: z.string().min(1, "Municipality is required"),
  educationLevel: z.string().min(1, "Education level is required"), 
  employmentStatus: z.string().min(1, "Employment status is required"),
  salaryRange: z.string().optional(),
  physicalAddress: z.string().min(1, "Physical address is required"),
});

type ProfileData = z.infer<typeof profileSchema>;

const employmentStatuses = [
  "Employed Full-Time",
  "Employed Part-Time",
  "Self-Employed",
  "Student",
  "Unemployed",
  "Retired",
];

const salaryRanges = [
  "No Income",
  "R2000 - R10,000",
  "R10,001 - R20,000",
  "R20,001 - R35,000",
  "R35,001 - R50,000",
  "R50,001 - R75,000",
  "R75,001+",
  "Prefer Not to Say"
];

const genders = ["Male", "Female", "Prefer Not to Say", "Other"];
const races = ["African", "Coloured", "Indian/Asian", "White", "Other", "Prefer Not to Say"];

const API_BASE_URL = 'http://localhost:5001/api';

// Google Places Autocomplete Types
interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PlacesAutocompleteResponse {
  predictions: PlacePrediction[];
  status: string;
}

// Custom Address Autocomplete Component
interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
}

const AddressAutocomplete = ({ value, onChange, onBlur, error }: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Google Places API Key 
  const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY';

  const fetchAddressSuggestions = async (input: string): Promise<PlacePrediction[]> => {
    if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'YOUR_GOOGLE_PLACES_API_KEY') {
      console.warn('Google Places API key not configured');
      return [];
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:za&key=${GOOGLE_PLACES_API_KEY}`
      );
      
      const data: PlacesAutocompleteResponse = await response.json();
      
      if (data.status === 'OK') {
        return data.predictions;
      } else if (data.status === 'ZERO_RESULTS') {
        return [];
      } else {
        console.error('Google Places API error:', data.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      return [];
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    // Clear previous debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (inputValue.length > 2) {
      setIsLoading(true);
      
      // Debounce API calls
      debounceRef.current = setTimeout(async () => {
        const results = await fetchAddressSuggestions(inputValue);
        setSuggestions(results);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: PlacePrediction) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Use setTimeout to allow click event on suggestions to fire first
    setTimeout(() => {
      setShowSuggestions(false);
      onBlur();
    }, 200);
  };

  const handleFocus = () => {
    if (value.length > 2 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const getPlaceDetails = async (placeId: string): Promise<string | null> => {
    if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'YOUR_GOOGLE_PLACES_API_KEY') {
      return null;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address&key=${GOOGLE_PLACES_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.result.formatted_address;
      }
      return null;
    } catch (error) {
      console.error('Error fetching place details:', error);
      return null;
    }
  };

  const handleSuggestionSelect = async (suggestion: PlacePrediction) => {
    // First set the description immediately for better UX
    onChange(suggestion.description);
    setShowSuggestions(false);

    // Then try to get more detailed address
    try {
      const detailedAddress = await getPlaceDetails(suggestion.place_id);
      if (detailedAddress) {
        onChange(detailedAddress);
      }
    } catch (error) {
      console.error('Error getting detailed address:', error);
      // Keep the original description if detailed fetch fails
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Start typing your address (e.g., 191 Jan Smuts, Rosebank)"
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={error ? "border-red-500 pr-10" : "border-gray-300 pr-10"}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <MapPin className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>
      
      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching for addresses...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.place_id}
                className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b last:border-b-0"
                onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {suggestion.structured_formatting.main_text}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {suggestion.structured_formatting.secondary_text}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No addresses found. Try being more specific.
            </div>
          )}
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600 font-medium mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default function ProfileCompletionPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableMunicipalities, setAvailableMunicipalities] = useState<string[]>([]);

  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      dateOfBirth: "",
      gender: "",
      race: "",
      idPassport: "",
      province: "",
      district: "",
      municipality: "",
      educationLevel: "",
      employmentStatus: "",
      salaryRange: "",
      physicalAddress: "",
    },
  });

  // Update districts when province changes
  useEffect(() => {
    const province = profileForm.watch("province");
    if (province && districtsByProvince[province]) {
      setAvailableDistricts(districtsByProvince[province]);
      profileForm.setValue("district", "");
      profileForm.setValue("municipality", "");
    } else {
      setAvailableDistricts([]);
      setAvailableMunicipalities([]);
    }
  }, [profileForm.watch("province")]);

  // Update municipalities when district changes
  useEffect(() => {
    const district = profileForm.watch("district");
    if (district && municipalitiesByDistrict[district]) {
      setAvailableMunicipalities(municipalitiesByDistrict[district]);
      profileForm.setValue("municipality", "");
    } else {
      setAvailableMunicipalities([]);
    }
  }, [profileForm.watch("district")]);

const onSubmit = async (data: ProfileData) => {
  const authToken = localStorage.getItem('authToken');
  
  if (!authToken) {
    toast({
      title: "Error",
      description: "Please complete registration first",
      variant: "destructive",
    });
    return;
  }

  try {
    setIsSubmitting(true);

    // Get user data from localStorage or context
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Prepare the data for submission to API
    const profileData = {
      physicalAddress: data.physicalAddress,
      dateOfBirth: data.dateOfBirth,
      educationLevel: data.educationLevel,
      province: data.province,
      district: data.district, // This maps to 'region' in database
      municipality: data.municipality,
      race: data.race || null,
      idPassport: data.idPassport || null,
      gender: data.gender,
      employmentStatus: data.employmentStatus,
      salaryRange: data.salaryRange || null
    };

    console.log("Sending profile data:", profileData);

    const response = await fetch(`${API_BASE_URL}/auth/complete-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(profileData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Profile completion failed');
    }

    console.log("Profile completion response:", result);

    // Prepare data for confirmation page
    const confirmationData = {
      first_name: userData.firstName || result.user?.first_name,
      last_name: userData.lastName || result.user?.last_name,
      physical_address: data.physicalAddress,
      email: userData.email || result.user?.email,
      dob: data.dateOfBirth,
      qualification: data.educationLevel,
      province: data.province,
      region: data.district,
      race: data.race,
      cellphone: userData.cellphone || result.user?.cellphone,
      gender: data.gender,
      id_passport: data.idPassport,
      employment_status: data.employmentStatus,
      salary_range: data.salaryRange,
      municipality: data.municipality
    };

    // Store in localStorage as fallback
    localStorage.setItem('userRegistrationData', JSON.stringify(confirmationData));

    // Navigate to confirmation page with the data
    navigate('/profile-confirmation', { 
      state: { userData: confirmationData } 
    });

  } catch (error: any) {
    console.error('Profile completion error:', error);
    toast({
      title: "Profile Completion Failed",
      description: error.message || "Please try again",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSkipProfile = () => {
    // Clear the token from localStorage
    localStorage.removeItem('authToken');
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Logo and Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex justify-center">
              <div className="text-4xl font-bold text-gray-800">
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800 }}>
                  <span className="text-green-600">S</span>
                  <span className="text-yellow-500">C</span>
                  <span className="text-red-500">D</span>
                  <span className="text-blue-600">P</span>
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Complete Your Profile
            </h1>
            <p className="mt-2 text-gray-600 text-base">
              Help us personalize your experience and connect you with relevant opportunities in your community.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">Community Profile</CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Share information about yourself to help us tailor programs and resources to your needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-base font-medium text-gray-700">
                          Date of Birth *
                        </Label>
                        <Controller
                          name="dateOfBirth"
                          control={profileForm.control}
                          render={({ field }) => (
                            <Input
                              id="dateOfBirth"
                              type="date"
                              value={field.value}
                              onChange={field.onChange}
                              className={profileForm.formState.errors.dateOfBirth ? "border-red-500" : "border-gray-300"}
                            />
                          )}
                        />
                        {profileForm.formState.errors.dateOfBirth && (
                          <p className="text-sm text-red-600 font-medium" role="alert">
                            {profileForm.formState.errors.dateOfBirth.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-base font-medium text-gray-700">
                          Gender *
                        </Label>
                        <Controller
                          name="gender"
                          control={profileForm.control}
                          render={({ field }) => (
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value}
                            >
                              <SelectTrigger id="gender" className={profileForm.formState.errors.gender ? "border-red-500" : "border-gray-300"}>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                                {genders.map((gender) => (
                                  <SelectItem key={gender} value={gender} className="hover:bg-green-50 focus:bg-green-50">
                                    {gender}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {profileForm.formState.errors.gender && (
                          <p className="text-sm text-red-600 font-medium" role="alert">
                            {profileForm.formState.errors.gender.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="race" className="text-base font-medium text-gray-700">
                        Race (Optional)
                      </Label>
                      <Controller
                        name="race"
                        control={profileForm.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="race" className="border-gray-300">
                              <SelectValue placeholder="Select race (optional)" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                              {races.map((race) => (
                                <SelectItem key={race} value={race} className="hover:bg-green-50 focus:bg-green-50">
                                  {race}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idPassport" className="text-base font-medium text-gray-700">
                        South African ID / Passport Number (Optional)
                      </Label>
                      <Controller
                        name="idPassport"
                        control={profileForm.control}
                        render={({ field }) => (
                          <Input
                            id="idPassport"
                            placeholder="1234567890123"
                            value={field.value}
                            onChange={field.onChange}
                            className="border-gray-300"
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* Location Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Location Information</h3>
                    
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="province" className="text-base font-medium text-gray-700">
                          Province *
                        </Label>
                        <Controller
                          name="province"
                          control={profileForm.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger id="province" className={profileForm.formState.errors.province ? "border-red-500" : "border-gray-300"}>
                                <SelectValue placeholder="Select province" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                                {provinces.map((province) => (
                                  <SelectItem key={province} value={province} className="hover:bg-green-50 focus:bg-green-50">
                                    {province}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {profileForm.formState.errors.province && (
                          <p className="text-sm text-red-600 font-medium" role="alert">
                            {profileForm.formState.errors.province.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="district" className="text-base font-medium text-gray-700">
                          District *
                        </Label>
                        <Controller
                          name="district"
                          control={profileForm.control}
                          render={({ field }) => (
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value}
                              disabled={!profileForm.watch("province")}
                            >
                              <SelectTrigger id="district" className={profileForm.formState.errors.district ? "border-red-500" : "border-gray-300"}>
                                <SelectValue placeholder="Select district" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                                {availableDistricts.map((district) => (
                                  <SelectItem key={district} value={district} className="hover:bg-green-50 focus:bg-green-50">
                                    {district}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {profileForm.formState.errors.district && (
                          <p className="text-sm text-red-600 font-medium" role="alert">
                            {profileForm.formState.errors.district.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="municipality" className="text-base font-medium text-gray-700">
                          Municipality *
                        </Label>
                        <Controller
                          name="municipality"
                          control={profileForm.control}
                          render={({ field }) => (
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value}
                              disabled={!profileForm.watch("district")}
                            >
                              <SelectTrigger id="municipality" className={profileForm.formState.errors.municipality ? "border-red-500" : "border-gray-300"}>
                                <SelectValue placeholder="Select municipality" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                                {availableMunicipalities.map((municipality) => (
                                  <SelectItem key={municipality} value={municipality} className="hover:bg-green-50 focus:bg-green-50">
                                    {municipality}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {profileForm.formState.errors.municipality && (
                          <p className="text-sm text-red-600 font-medium" role="alert">
                            {profileForm.formState.errors.municipality.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* New Physical Address Field */}
                    <div className="space-y-2">
                      <Label htmlFor="physicalAddress" className="text-base font-medium text-gray-700">
                        Physical Address *
                      </Label>
                      <Controller
                        name="physicalAddress"
                        control={profileForm.control}
                        render={({ field }) => (
                          <AddressAutocomplete
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={profileForm.formState.errors.physicalAddress?.message}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* Education and Employment Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Education & Employment</h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="educationLevel" className="text-base font-medium text-gray-700">
                          Highest Education Level *
                        </Label>
                        <Controller
                          name="educationLevel"
                          control={profileForm.control}
                          render={({ field }) => (
                            <Input
                              id="educationLevel"
                              placeholder="e.g., Bachelor's Degree in Computer Science"
                              value={field.value}
                              onChange={field.onChange}
                              className={profileForm.formState.errors.educationLevel ? "border-red-500" : "border-gray-300"}
                            />
                          )}
                        />
                        {profileForm.formState.errors.educationLevel && (
                          <p className="text-sm text-red-600 font-medium" role="alert">
                            {profileForm.formState.errors.educationLevel.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Please describe your highest education level
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employmentStatus" className="text-base font-medium text-gray-700">
                          Employment Status *
                        </Label>
                        <Controller
                          name="employmentStatus"
                          control={profileForm.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger id="employmentStatus" className={profileForm.formState.errors.employmentStatus ? "border-red-500" : "border-gray-300"}>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                                {employmentStatuses.map((status) => (
                                  <SelectItem key={status} value={status} className="hover:bg-green-50 focus:bg-green-50">
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {profileForm.formState.errors.employmentStatus && (
                          <p className="text-sm text-red-600 font-medium" role="alert">
                            {profileForm.formState.errors.employmentStatus.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salaryRange" className="text-base font-medium text-gray-700">
                        Monthly Income Range (Optional)
                      </Label>
                      <Controller
                        name="salaryRange"
                        control={profileForm.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="salaryRange" className="border-gray-300">
                              <SelectValue placeholder="Select income range" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                              {salaryRanges.map((range) => (
                                <SelectItem key={range} value={range} className="hover:bg-green-50 focus:bg-green-50">
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSkipProfile}
                      className="bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      Skip Profile
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105 rounded-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Complete Profile"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}