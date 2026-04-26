import { create } from 'zustand'

export type BreadcrumbItemType = {
  label: string
  href?: string
}

type LayoutStore = {
  heading: string
  subHeading: string
}

type BreadcrumbStore = {
  breadcrumbs: BreadcrumbItemType[];
  layout: LayoutStore;
  setBreadcrumbs: (breadcrumbs: BreadcrumbItemType[]) => void;
  setLayout: (layout: LayoutStore) => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  breadcrumbs: [],
  layout: {
    heading: "",
    subHeading: "",
  },
  setBreadcrumbs: (breadcrumbs: BreadcrumbItemType[]) => set({ breadcrumbs }),
  setLayout: (layout: LayoutStore) => set({ layout }),
}))
