import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ADMISSION_FIELDS, AdmissionField } from '../constants/admission-fields';

interface AdmissionSettingsState {
  fieldSettings: Record<string, boolean>;
  customFields: AdmissionField[];
  updateFieldSetting: (fieldId: string, value: boolean) => void;
  addCustomField: (field: AdmissionField) => void;
  removeCustomField: (fieldId: string) => void;
  resetSettings: () => void;
}

export const useAdmissionSettingsStore = create<AdmissionSettingsState>()(
  persist(
    (set) => ({
      fieldSettings: ADMISSION_FIELDS.reduce((acc, field) => {
        acc[field.id] = field.isStep1;
        return acc;
      }, {} as Record<string, boolean>),
      customFields: [],
      
      updateFieldSetting: (fieldId, value) => set((state) => ({
        fieldSettings: { ...state.fieldSettings, [fieldId]: value }
      })),

      addCustomField: (field) => set((state) => ({
        customFields: [...state.customFields, { ...field, isCustom: true }],
        fieldSettings: { ...state.fieldSettings, [field.id]: true }
      })),

      removeCustomField: (fieldId) => set((state) => {
        const { [fieldId]: _, ...rest } = state.fieldSettings;
        return {
          customFields: state.customFields.filter(f => f.id !== fieldId),
          fieldSettings: rest
        };
      }),
      
      resetSettings: () => set({
        fieldSettings: ADMISSION_FIELDS.reduce((acc, field) => {
          acc[field.id] = field.isStep1;
          return acc;
        }, {} as Record<string, boolean>),
        customFields: []
      }),
    }),
    {
      name: 'admission-settings-storage',
    }
  )
);
