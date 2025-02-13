import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp, Globe, Phone, User } from "lucide-react"
import { Company } from "../interfaces/company"

interface CompanyDetailsListProps {
    companies: Company[]
} 

const CompanyList: React.FC<CompanyDetailsListProps> = ({ companies }) => {
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null)

  const toggleCompany = (companyId: number) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId)
  }

  // Placeholder function for assigning a company
  const assignCompany = (companyId: number) => {
    console.log(`Assigning company with ID: ${companyId}`)
    // You'll implement the actual assignment logic here
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compañias</h1>
      <div className="space-y-4">
        {companies.map((company) => (
          <div key={company.companyId} className="border rounded-lg shadow-sm">
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleCompany(company.companyId)}
            >
              <h2 className="text-xl font-semibold">{company.companyName}</h2>
              {expandedCompany === company.companyId ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </div>
            {expandedCompany === company.companyId && (
              <div className="p-4 border-t">
                <p className="mb-2">
                  <strong>Dirección:</strong> {company.companyAddress}
                </p>
                <p className="mb-2">
                  <strong>Industria:</strong> {company.companyIndustry}
                </p>
                <p className="mb-2">
                  <strong>Ganacias:</strong> {company.companyRevenue}
                </p>
                <p className="mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <a
                    href={company.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {company.companyWebsite}
                  </a>
                </p>
                <p className="mb-4 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {company.companyPhone}
                </p>
                <h3 className="text-lg font-semibold mb-2">Contactos:</h3>
                <div className="space-y-4">
                  {company.Contact.map((contact) => (
                    <div key={contact.contactId} className="border-t pt-2">
                      <p>
                        <strong>
                          {contact.contactFirstName} {contact.contactLastName}
                        </strong>
                      </p>
                      <p>{contact.contactTitle}</p>
                      <p>{contact.contactEmail}</p>
                      <a
                        href={contact.contactProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Asignamiento:</h3>
                  {company.Assign && company.Assign.User ? (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <p>
                        {company.Assign.User.userName} {company.Assign.User.userLastName} -{" "}
                        {company.Assign.User.userEmail}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => assignCompany(company.companyId)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Asignarme esta Compañia
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyList

