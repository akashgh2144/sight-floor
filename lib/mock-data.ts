export interface Order {
  id: string;
  status: "Sewing" | "Cutting" | "Finishing" | "Completed";
  style: string;
  product: string; // Added
  buyer: string; // Added
  factory: {
    name: string;
    avatar: string;
    phone: string;
  };
  cutQty: number;
  sewingOutput: number;
  packed: number;
  efficiency: number;
  shipDate: string;
  aiPrediction: string;
  isDelayed: boolean;
  currentStep: string; // Added
  progress: number; // Added
  lastCommunication: {
    status: "sent" | "delivered" | "read" | "replied" | "failed";
    text: string;
    timestamp: string;
  };
  timelineSteps: {
    id: number;
    label: string;
    status: "pending" | "in-progress" | "completed";
    date: string;
    messageStatus?: "sent" | "delivered" | "read" | "replied" | "failed";
    messageText?: string;
    thumbnail?: string;
  }[];
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-5502",
    status: "Sewing",
    style: "HM-502-Tee",
    product: "Men's Basic Tee",
    buyer: "H&M",
    factory: {
      name: "Dhaka Unit 1",
      avatar: "/avatars/factory-1.png",
      phone: "+8801711000000",
    },
    cutQty: 10000,
    sewingOutput: 6500,
    packed: 2000,
    efficiency: 82,
    shipDate: "2025-01-15",
    aiPrediction: "2025-01-14",
    isDelayed: false,
    currentStep: "Sewing Line 4",
    progress: 65,
    lastCommunication: {
      status: "replied",
      text: "Photo sent 10m ago",
      timestamp: "10m ago",
    },
    timelineSteps: [
      { id: 1, label: "Fabric In", status: "completed", date: "Jan 10, 08:00", messageStatus: "read", messageText: "Seen by Manager (9:15 AM)" },
      { id: 2, label: "Cutting", status: "completed", date: "Jan 11, 14:30", messageStatus: "read", messageText: "Seen by Manager (2:30 PM)" },
      { id: 3, label: "Sewing", status: "in-progress", date: "Now", messageStatus: "replied", messageText: "Photo sent 10m ago", thumbnail: "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=300&auto=format&fit=crop" },
      { id: 4, label: "Finishing", status: "pending", date: "Est. Jan 14", messageStatus: "sent", messageText: "Request Sent (9:00 AM)" },
      { id: 5, label: "Shipment", status: "pending", date: "Est. Jan 15" },
    ],
  },
  {
    id: "ORD-9901",
    status: "Cutting",
    style: "ZARA-990-Denim",
    product: "Slim Fit Jeans",
    buyer: "Zara",
    factory: {
      name: "Chittagong EPZ-2",
      avatar: "/avatars/factory-2.png",
      phone: "+8801811000000",
    },
    cutQty: 5000,
    sewingOutput: 0,
    packed: 0,
    efficiency: 95,
    shipDate: "2025-01-20",
    aiPrediction: "2025-01-19",
    isDelayed: false,
    currentStep: "Fabric Cutting",
    progress: 15,
    lastCommunication: {
      status: "read",
      text: "Read 1h ago",
      timestamp: "1h ago",
    },
    timelineSteps: [
      { id: 1, label: "Fabric In", status: "completed", date: "Jan 12, 09:00", messageStatus: "read", messageText: "Seen by Manager (10:00 AM)" },
      { id: 2, label: "Cutting", status: "in-progress", date: "Now", messageStatus: "read", messageText: "Read 1h ago" },
      { id: 3, label: "Sewing", status: "pending", date: "Est. Jan 15" },
      { id: 4, label: "Finishing", status: "pending", date: "Est. Jan 18" },
      { id: 5, label: "Shipment", status: "pending", date: "Est. Jan 20" },
    ],
  },
  {
    id: "ORD-0012",
    status: "Finishing",
    style: "GAP-Kids-001",
    product: "Kids Hoodie",
    buyer: "Gap",
    factory: {
      name: "Gazipur Wash Plant",
      avatar: "/avatars/factory-3.png",
      phone: "+8801911000000",
    },
    cutQty: 12000,
    sewingOutput: 11800,
    packed: 8500,
    efficiency: 78,
    shipDate: "2025-01-10",
    aiPrediction: "2025-01-12",
    isDelayed: true,
    currentStep: "Final QC",
    progress: 90,
    lastCommunication: {
      status: "failed",
      text: "Block/Error",
      timestamp: "2h ago",
    },
    timelineSteps: [
      { id: 1, label: "Fabric In", status: "completed", date: "Jan 05, 08:00", messageStatus: "read", messageText: "Seen by Manager" },
      { id: 2, label: "Cutting", status: "completed", date: "Jan 07, 14:30", messageStatus: "read", messageText: "Seen by Manager" },
      { id: 3, label: "Sewing", status: "completed", date: "Jan 09, 10:00", messageStatus: "read", messageText: "Seen by Manager" },
      { id: 4, label: "Finishing", status: "in-progress", date: "Now", messageStatus: "failed", messageText: "Block/Error" },
      { id: 5, label: "Shipment", status: "pending", date: "Est. Jan 10" },
    ],
  },
  {
    id: "ORD-5503",
    status: "Sewing",
    style: "HM-502-Tee",
    product: "Men's Basic Tee",
    buyer: "H&M",
    factory: {
      name: "Dhaka Unit 1",
      avatar: "/avatars/factory-1.png",
      phone: "+8801711000000",
    },
    cutQty: 8000,
    sewingOutput: 4200,
    packed: 1000,
    efficiency: 88,
    shipDate: "2025-01-18",
    aiPrediction: "2025-01-17",
    isDelayed: false,
    currentStep: "Sewing Line 2",
    progress: 45,
    lastCommunication: {
      status: "sent",
      text: "Delivered",
      timestamp: "5m ago",
    },
    timelineSteps: [
      { id: 1, label: "Fabric In", status: "completed", date: "Jan 11, 08:00", messageStatus: "read", messageText: "Seen by Manager" },
      { id: 2, label: "Cutting", status: "completed", date: "Jan 12, 14:30", messageStatus: "read", messageText: "Seen by Manager" },
      { id: 3, label: "Sewing", status: "in-progress", date: "Now", messageStatus: "sent", messageText: "Delivered" },
      { id: 4, label: "Finishing", status: "pending", date: "Est. Jan 16" },
      { id: 5, label: "Shipment", status: "pending", date: "Est. Jan 18" },
    ],
  },
];

export interface FeedItem {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  aiStatus: "MATCH CONFIRMED" | "ANOMALY DETECTED" | "PROCESSING";
  image?: string;
}

export const MOCK_FEED: FeedItem[] = [
  {
    id: "evt-1",
    timestamp: "14:32:01",
    source: "Dhaka Unit 1 / Line 5",
    event: "Supervisor uploaded Line Board photo",
    aiStatus: "MATCH CONFIRMED",
    image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "evt-2",
    timestamp: "14:31:45",
    source: "Chittagong EPZ-2 / Cutting",
    event: "Automated fabric roll scan completed",
    aiStatus: "MATCH CONFIRMED",
  },
  {
    id: "evt-3",
    timestamp: "14:30:12",
    source: "Gazipur Wash Plant / QC",
    event: "Defect rate spike detected in hourly sample",
    aiStatus: "ANOMALY DETECTED",
    image: "https://images.unsplash.com/photo-1605218427368-35b0f996d916?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "evt-4",
    timestamp: "14:28:55",
    source: "Dhaka Unit 1 / Line 2",
    event: "Operator logged machine downtime (Needle Breakage)",
    aiStatus: "PROCESSING",
  },
  {
    id: "evt-5",
    timestamp: "14:25:30",
    source: "Chittagong EPZ-2 / Store",
    event: "Inventory update: Zippers received",
    aiStatus: "MATCH CONFIRMED",
  },
  {
    id: "evt-6",
    timestamp: "14:22:10",
    source: "Dhaka Unit 1 / Line 5",
    event: "Hourly output count verification",
    aiStatus: "MATCH CONFIRMED",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "evt-7",
    timestamp: "14:18:05",
    source: "Gazipur Wash Plant / Finishing",
    event: "Batch #4492 completed washing cycle",
    aiStatus: "MATCH CONFIRMED",
  },
  {
    id: "evt-8",
    timestamp: "14:15:00",
    source: "Dhaka Unit 1 / Maintenance",
    event: "Scheduled maintenance started on Cutter 03",
    aiStatus: "PROCESSING",
  },
];

export interface ApprovalItem {
  id: string;
  factory: string;
  taskName: string;
  styleRef: string;
  timestamp: string;
  image: string;
  claimed: number;
  required: number;
  gpsMatch: boolean;
  status: "pending" | "approved" | "rejected";
  whatsappNumber: string;
  mediaType: "photo" | "video" | "audio";
  isUrgent: boolean;
}

export const MOCK_APPROVALS: ApprovalItem[] = [
  {
    id: "apv-1",
    factory: "Dhaka Unit 1",
    taskName: "Fabric In-house Verification",
    styleRef: "SUM-2025",
    timestamp: "10m ago",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
    claimed: 5000,
    required: 5000,
    gpsMatch: true,
    status: "pending",
    whatsappNumber: "+8801711000000",
    mediaType: "photo",
    isUrgent: false,
  },
  {
    id: "apv-2",
    factory: "Chittagong EPZ-2",
    taskName: "Cutting Table Setup",
    styleRef: "ZARA-990-Denim",
    timestamp: "2h ago",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
    claimed: 0,
    required: 0,
    gpsMatch: true,
    status: "pending",
    whatsappNumber: "+8801811000000",
    mediaType: "photo",
    isUrgent: true,
  },
  {
    id: "apv-3",
    factory: "Gazipur Wash Plant",
    taskName: "Wash Standard Approval",
    styleRef: "GAP-Kids-001",
    timestamp: "Yesterday",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    claimed: 100,
    required: 100,
    gpsMatch: false,
    status: "pending",
    whatsappNumber: "+8801911000000",
    mediaType: "photo",
    isUrgent: false,
  },
  {
    id: "apv-4",
    factory: "Dhaka Unit 1",
    taskName: "Packing List Verification",
    styleRef: "HM-502-Tee",
    timestamp: "Yesterday",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    claimed: 2000,
    required: 2000,
    gpsMatch: true,
    status: "pending",
    whatsappNumber: "+8801711000000",
    mediaType: "photo",
    isUrgent: false,
  },
  {
    id: "apv-5",
    factory: "Dhaka Unit 1",
    taskName: "Voice Note Update",
    styleRef: "HM-502-Tee",
    timestamp: "5m ago",
    image: "", // No image for audio
    claimed: 0,
    required: 0,
    gpsMatch: false,
    status: "pending",
    whatsappNumber: "+8801711000000",
    mediaType: "audio",
    isUrgent: false,
  },
];

export interface FactoryUser {
  id: string;
  name: string;
  phone: string;
  role: "Admin" | "Manager" | "Viewer";
  lastActive: string;
  status: "Active" | "Invited";
}

export interface Factory {
  id: string;
  name: string;
  location: string;
  country: string;
  riskGrade: "A" | "B" | "C";
  capacity: number;
  phone: string;
  email: string;
  contactPerson: string;
  onTimeRate: number;
  coordinates: { lat: number; lng: number };
  users: FactoryUser[];
  status: "Online" | "Offline" | "Pending";
  lastReply?: string;
  avgResponseTime: number;
  runningOrders: number;
  sessionExpiry?: string;
}

export const MOCK_FACTORIES: Factory[] = [
  {
    id: "fac-1",
    name: "Dhaka Unit 1",
    location: "Savar, Dhaka",
    country: "Bangladesh",
    riskGrade: "A",
    capacity: 150000,
    phone: "+880 1711-000000",
    email: "info@dhakaunit1.com",
    contactPerson: "Mr. Rahim",
    onTimeRate: 94,
    coordinates: { lat: 23.8479, lng: 90.2576 },
    status: "Online",
    lastReply: "10 mins ago",
    avgResponseTime: 12,
    runningOrders: 5,
    sessionExpiry: "14 hours 20 mins",
    users: [
      {
        id: "usr-1",
        name: "Rahim Ahmed",
        phone: "+8801711000000",
        role: "Admin",
        lastActive: "2 mins ago",
        status: "Active",
      },
      {
        id: "usr-2",
        name: "Karim Ullah",
        phone: "+8801711000001",
        role: "Manager",
        lastActive: "1 hour ago",
        status: "Active",
      },
    ],
  },
  {
    id: "fac-2",
    name: "Chittagong EPZ-2",
    location: "CEPZ, Chittagong",
    country: "Bangladesh",
    riskGrade: "B",
    capacity: 80000,
    phone: "+880 1811-000000",
    email: "info@cepz2.com",
    contactPerson: "Ms. Fatema",
    onTimeRate: 88,
    coordinates: { lat: 22.2916, lng: 91.7863 },
    status: "Offline",
    lastReply: "2 days ago",
    avgResponseTime: 45,
    runningOrders: 2,
    sessionExpiry: undefined,
    users: [
      {
        id: "usr-3",
        name: "Fatema Begum",
        phone: "+8801811000000",
        role: "Admin",
        lastActive: "5 mins ago",
        status: "Active",
      },
    ],
  },
  {
    id: "fac-3",
    name: "Gazipur Wash Plant",
    location: "Gazipur Sadar",
    country: "Bangladesh",
    riskGrade: "A",
    capacity: 200000,
    phone: "+880 1911-000000",
    email: "info@gazipurwash.com",
    contactPerson: "Mr. Kamal",
    onTimeRate: 97,
    coordinates: { lat: 23.9999, lng: 90.4203 },
    status: "Pending",
    avgResponseTime: 0,
    runningOrders: 0,
    users: [
      {
        id: "usr-4",
        name: "Kamal Hossain",
        phone: "+8801911000000",
        role: "Admin",
        lastActive: "Just now",
        status: "Active",
      },
      {
        id: "usr-5",
        name: "Jamal Uddin",
        phone: "+8801911000001",
        role: "Manager",
        lastActive: "1 day ago",
        status: "Invited",
      },
    ],
  },
];

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Merchandiser" | "Viewer";
  status: "Active" | "Invited";
  avatar?: string;
}

export const MOCK_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Mark Robinson",
    email: "mark.r@ironclad.com",
    role: "Admin",
    status: "Active",
    avatar: "MR",
  },
  {
    id: "tm-2",
    name: "Sarah Chen",
    email: "sarah.c@ironclad.com",
    role: "Merchandiser",
    status: "Active",
    avatar: "SC",
  },
  {
    id: "tm-3",
    name: "David Miller",
    email: "david.m@ironclad.com",
    role: "Viewer",
    status: "Invited",
    avatar: "DM",
  },
];
