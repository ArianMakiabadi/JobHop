import {
  FiUsers,
  FiBriefcase,
  FiStar,
  FiSearch,
  FiShield,
  FiGlobe,
  FiGrid,
  FiMessageSquare,
  FiClock,
  FiAward,
  FiZap,
} from "react-icons/fi";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { RiHandHeartLine } from "react-icons/ri";
import { AiFillWallet } from "react-icons/ai";
import { RiRocketLine } from "react-icons/ri";
import type { IconType } from "react-icons";

export interface HomeFeature {
  icon: IconType;
  title: string;
  desc: string;
}

export interface HighlightPill {
  icon: IconType;
  label: string;
}

export interface HomeStat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TabItem {
  icon: IconType;
  text: string;
}

export const features: HomeFeature[] = [
  {
    icon: FiUsers,
    title: "Connect",
    desc: "Instantly reach verified talent and employers across 120+ countries.",
  },
  {
    icon: FiBriefcase,
    title: "Projects",
    desc: "Create, browse, and manage projects with kanban views and milestones.",
  },
  {
    icon: FiStar,
    title: "Top Talent",
    desc: "Shortlists powered by proof-of-work, reviews, and skills assessments.",
  },
  {
    icon: FiSearch,
    title: "Smart Matching",
    desc: "Ranking surfaces best-fit candidates based on outcomes and context.",
  },
  {
    icon: FiShield,
    title: "Trust & Safety",
    desc: "Escrow payments, verified IDs, and dispute resolution baked in.",
  },
  {
    icon: FiGlobe,
    title: "Global by Default",
    desc: "Multi-currency, tax-friendly invoices, and flexible contracts.",
  },
];

export const highlightPills: HighlightPill[] = [
  { icon: FaWandMagicSparkles, label: "No placement fees" },
  { icon: RiHandHeartLine, label: "1-click contracts" },
  { icon: AiFillWallet, label: "Escrow payouts" },
  { icon: FiShield, label: "GDPR-ready" },
  { icon: FiGrid, label: "API access" },
  { icon: FiMessageSquare, label: "24/7 support" },
];

export const stats: HomeStat[] = [
  { value: ">50k", label: "Matches" },
  { value: "24h", label: "Avg. hire time" },
  { value: "4.9/5", label: "Satisfaction" },
  { value: "$1M+", label: "Paid out" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "We cut our time-to-hire from 3 weeks to 48 hours. The shortlists are scarily accurate.",
    name: "Priya A.",
    role: "Head of Product, Fintech",
  },
  {
    quote:
      "As a freelancer, I finally get paid on schedule. JobHop = peace of mind.",
    name: "Marco R.",
    role: "Senior UI Engineer",
  },
  {
    quote:
      "The built-in contracts and messaging keep everything in one place. It's just faster.",
    name: "Helen K.",
    role: "Agency Founder",
  },
];

export const faq: FaqItem[] = [
  {
    q: "How are candidates vetted?",
    a: "Profiles blend portfolio evidence, verified IDs, skill checks, and reference-backed reviews.",
  },
  {
    q: "How do payments work?",
    a: "Milestone-based escrow. Funds are released on approval, with transparent fees for both sides.",
  },
  {
    q: "Can I integrate JobHop with my stack?",
    a: "Yes. Use our API to sync candidates, roles, and invoices with your PM and accounting tools.",
  },
];

export const employerTabs: TabItem[] = [
  { icon: FiClock, text: "Shortlists in minutes, not weeks." },
  { icon: FiShield, text: "Reliable, compliant payments with escrow." },
  { icon: FiAward, text: "Verified skills and portfolio-backed profiles." },
  { icon: FiZap, text: "One-click NDAs and contracts." },
];

export const freelancerTabs: TabItem[] = [
  { icon: RiRocketLine, text: "Stand out with rich project case studies." },
  { icon: FiStar, text: "Boost ranking with outcome-based reviews." },
  { icon: AiFillWallet, text: "Milestones, fast payouts, zero surprises." },
  { icon: FiGlobe, text: "Global clients, local compliance." },
];
