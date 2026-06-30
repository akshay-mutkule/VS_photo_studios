export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin'
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImageUrl: string;
  isPasswordProtected: boolean;
  password?: string;
  clientEmail?: string;
  createdAt: any;
  updatedAt: any;
  // Selection fields
  isSelectionEnabled?: boolean;
  selectionTargetCount?: number;
  selectedPhotosList?: string[];
  selectionStatus?: 'pending' | 'submitted' | 'approved';
  clientInstructions?: string;
}

export interface Photo {
  id: string;
  albumId: string;
  url: string;
  thumbnailUrl: string;
  type: 'image' | 'video';
  tags: string[];
  favoritesCount?: number;
  createdAt: any;
}

export interface Booking {
  id: string;
  clientId: string;
  clientEmail: string;
  clientName?: string;
  clientPhone?: string;
  sessionType: string;
  packageName?: string;
  date: string;
  timeSlot?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  paymentStatus: 'unpaid' | 'partially_paid' | 'paid';
  notes?: string;
  createdAt?: any;
}

export interface Testimonial {
  id: string;
  userName: string;
  userRole: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}
