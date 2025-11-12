import { create } from "zustand"
import { persist } from "zustand/middleware"

export type RegistrationData = {
  // Step 1: Account Registration
  email: string
  password: string
  // Step 2: Personal Information
  firstName: string
  lastName: string
  contactNumber: string
  age: string
  province: string
  town: string
  employmentStatus: string
  gender: string
  idPassport: string
  race: string
}

type RegistrationStore = {
  currentStep: number
  registrationData: RegistrationData
  setCurrentStep: (step: number) => void
  updateRegistrationData: (data: Partial<RegistrationData>) => void
  resetRegistration: () => void
}

const initialData: RegistrationData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  contactNumber: "",
  age: "",
  province: "",
  town: "",
  employmentStatus: "",
  gender: "",
  idPassport: "",
  race: "",
}

export const useRegistrationStore = create<RegistrationStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      registrationData: initialData,
      setCurrentStep: (step) => set({ currentStep: step }),
      updateRegistrationData: (data) =>
        set((state) => ({
          registrationData: { ...state.registrationData, ...data },
        })),
      resetRegistration: () => set({ currentStep: 1, registrationData: initialData }),
    }),
    {
      name: "registration-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        registrationData: state.registrationData,
      }),
    },
  ),
)
