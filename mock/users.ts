import type { DemoUser, Role } from "./types";

export const demoUsers: DemoUser[] = [
  {
    role: "startup",
    name: "Aarav Kulkarni",
    email: "founder@ecotech.in",
    password: "demo1234",
    org: "EcoTech Solutions",
    title: "Founder & CEO",
    home: "/startup",
  },
  {
    role: "government",
    name: "Smt. Priya Deshmukh, IAS",
    email: "priya.deshmukh@mahaurban.gov.in",
    password: "demo1234",
    org: "Maharashtra Urban Development Department",
    title: "Joint Secretary",
    home: "/government",
  },
  {
    role: "expert",
    name: "Dr. Rakesh Iyer",
    email: "r.iyer@iitb.ac.in",
    password: "demo1234",
    org: "IIT Bombay — Centre for Environmental Science",
    title: "Domain Expert",
    home: "/expert",
  },
  {
    role: "validator",
    name: "Neha Joshi",
    email: "neha.joshi@nabl-validators.in",
    password: "demo1234",
    org: "NABL Accredited Field Validation Agency",
    title: "Independent Validator",
    home: "/validator",
  },
  {
    role: "admin",
    name: "Vikram Rao",
    email: "admin@startupsetu.gov.in",
    password: "demo1234",
    org: "StartupSetu Platform Office",
    title: "Platform Administrator",
    home: "/admin",
  },
];

export const roleLabels: Record<Role, string> = {
  startup: "Startup Owner",
  government: "Government Administrator",
  expert: "Expert / Reviewer",
  validator: "Independent Validator",
  admin: "Platform Administrator",
};

export function userForRole(role: Role): DemoUser {
  return demoUsers.find((u) => u.role === role)!;
}
