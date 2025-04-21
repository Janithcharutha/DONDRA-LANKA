export interface NewsBanner {
  _id: string
  title: string
  content: string
  imageUrl?: string
  startDate: string
  endDate: string
  status: 'Active' | 'Scheduled' | 'Expired'
  createdAt: string
  updatedAt: string
}