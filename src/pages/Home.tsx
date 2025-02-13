import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Typography, List, Spin, message, Input } from "antd"
import type { Company, Action } from "../interfaces/company"
import { fetchCompanies } from "../api/company"
import { assignMe } from "../api/assign"
import CompanyDetails from "../components/CompanyDetails"
import { assignAction } from "../api/action"

const { Title } = Typography
const { Search } = Input

const Home: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null)
  const [userId, setUserId] = useState<string | null>("")
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("userId")

    if (!storedUser || !token) {
      navigate("/login")
    }

    setUserId(id)
    
    console.log({id})

    fetchCompanies().then((data) => {
      console.log({ data });
      setCompanies(data)
      setFilteredCompanies(data)
      setLoading(false)
    })
  }, [navigate])

  const toggleCompany = (companyId: number) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId)
  }

  const assignCompany = (companyId: number) => {
    if (userId) {
      assignMe(userId, companyId.toString()).then((data) => {
        if (data) {
          message.success("Company assigned successfully")
          // Refresh companies data
          fetchCompanies().then((updatedData) => {
            setCompanies(updatedData)
            setFilteredCompanies(updatedData)
          })
        }
      })
    }
  }

  const createAction = async (companyId: number, action: Omit<Action, "actionId">) => {
    // Here you would typically make an API call to create the action
    // For now, we'll just update the local state
    await assignAction(action);
    const updatedCompanies = companies.map((company) => {
      if (company.companyId === companyId) {
        const newAction = { ...action, actionId: Date.now() } // Use a timestamp as a temporary ID
        return {
          ...company,
          Assign: {
            ...company.Assign,
            Action: [...(company.Assign?.Action || []), newAction],
          },
        }
      }
      return company
    })
    setCompanies(updatedCompanies)
    setFilteredCompanies(updatedCompanies)
    message.success("Action created successfully")
  }

  const handleSearch = (value: string) => {
    const filtered = companies.filter((company) => company.companyName.toLowerCase().includes(value.toLowerCase()))
    setFilteredCompanies(filtered)
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <>
      <Title level={2}>Company List</Title>
      <Search placeholder="Search companies" onSearch={handleSearch} style={{ marginBottom: 20 }} />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 10,
        }}
        dataSource={filteredCompanies}
        renderItem={(company) => (
          <List.Item
            key={company.companyId}
            extra={
              <img width={272} alt="company logo" src={`https://picsum.photos/seed/${company.companyName}/272/172`} />
            }
          >
            <List.Item.Meta
              title={<a onClick={() => toggleCompany(company.companyId)}>{company.companyName}</a>}
              description={company.companyIndustry}
            />
            {expandedCompany === company.companyId && (
              <CompanyDetails company={company} onAssign={assignCompany} onCreateAction={createAction} />
            )}
          </List.Item>
        )}
      />
    </>
  )
}

export default Home

