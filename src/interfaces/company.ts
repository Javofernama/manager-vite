export interface Contact {
  contactId: number
  companyId: number
  contactFirstName: string
  contactLastName: string
  contactGender: string
  contactTitle: string
  contactPosition: string
  contactCode: string
  contactEmail: string
  contactProfileUrl: string
}

export interface AssignUser {
  userName: string
  userLastName: string
  userEmail: string
}

export interface Action {
  assignId?: number;
  actionId: number
  actionTitle: string
  actionDescription: string
  actionDate: string
  actionType: string
  actionState: boolean
}

export interface Assign {
  User?: AssignUser
  Action?: Action[]
  assignId?: number
}

export interface Company {
  companyId: number
  companyName: string
  companyAddress: string
  companyWebsite: string
  companyIndustry: string
  companyRevenue: string
  companyPhone: string
  Contact: Contact[]
  Assign?: Assign
}

