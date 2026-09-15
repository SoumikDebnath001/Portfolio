export type Project = {
  title: string;
  summary: string;
  description: string;
  url: string;
  github: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "ComfyStay: Hotel Management Platform",
    summary: "Hotel booking platform with Razorpay payments, guest reviews and an admin dashboard.",
    description:
      "A full-stack hotel booking and management platform with room and room-type listings, online bookings with Razorpay payments, guest reviews, and an admin dashboard for managing rooms, bookings, and payment status. REST API built with Node.js, Express, and MongoDB with JWT authentication, OTP email verification, and S3 file uploads.",
    url: "https://hotel-manage-ment-website.vercel.app/",
    github: "https://github.com/SoumikDebnath001/HotelManageMentWebsite",
    tags: ["React", "Redux", "Express", "Node.js", "MongoDB"],
  },
  {
    title: "Cricket Academy: Foundation & Academy Platform",
    summary: "Academy management with role-based access, subscriptions and real-time admin notifications.",
    description:
      "Built a full-stack cricket academy management platform with role-based access (member / coach / admin), subscription lifecycle, and real-time admin notification system. RESTful backend using Node.js, Express, TypeScript, and MongoDB with JWT authentication, Zod validation, and Cloudinary. Admin panel supporting soft-delete and bulk-delete for inquiries, subscription management with plan/start-date controls, user suspension toggle, and a polling notification bell (60s interval). Containerised the full stack with Docker and docker-compose; managed environment parity across development and production.",
    url: "https://obuyagrassrootsfoundation.org",
    github: "https://github.com/SoumikDebnath001/Cricket_Academy",
    tags: ["Next.js", "Express", "Node.js", "MongoDB", "TypeScript"],
  },
  {
    title: "Obuya Grassroots Foundation: Courses Platform",
    summary: "Online courses platform where members browse, enroll in and take academy training.",
    description:
      "An online courses platform for the Obuya Grassroots Foundation, enabling members to browse, enroll in, and access training courses offered by the academy.",
    url: "https://courses.obuyagrassrootsfoundation.org/",
    github: "https://github.com/SoumikDebnath001/Cricket_Academy",
    tags: ["Next.js", "Node.js", "MongoDB", "TypeScript"],
  },
];
