import type React from "react"
import { useState } from "react"
import { Card, Typography, Button, List, Space, Descriptions, Avatar, Collapse } from "antd"
import {
  GlobalOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  PlusOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons"
import type { Company, Contact, Action } from "../interfaces/company"
import ActionModal from "./ActionModal"

const { Text, Link } = Typography
const { Panel } = Collapse

interface CompanyDetailsProps {
  company: Company
  onAssign: (companyId: number) => void
  onCreateAction: (companyId: number, action: Omit<Action, "actionId">) => void
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, onAssign, onCreateAction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [assignId, setAssignId] = useState<number | undefined>();

  return (
    <Card>
      <Descriptions title="Company Information" bordered>
        <Descriptions.Item label="Address">{company.companyAddress}</Descriptions.Item>
        <Descriptions.Item label="Industry">{company.companyIndustry}</Descriptions.Item>
        <Descriptions.Item label="Revenue">{company.companyRevenue}</Descriptions.Item>
        <Descriptions.Item label="Website">
          <Link href={company.companyWebsite} target="_blank">
            <GlobalOutlined /> {company.companyWebsite}
          </Link>
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          <PhoneOutlined /> {company.companyPhone}
        </Descriptions.Item>
      </Descriptions>

      <Collapse defaultActiveKey={["1"]} className="mt-4">
        <Panel header="Contacts" key="1">
          <List
            itemLayout="horizontal"
            dataSource={company.Contact}
            renderItem={(contact: Contact) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={`${contact.contactFirstName} ${contact.contactLastName}`}
                  description={
                    <Space direction="vertical">
                      <Text>{contact.contactTitle}</Text>
                      <Text>
                        <MailOutlined /> {contact.contactEmail}
                      </Text>
                      <Link href={contact.contactProfileUrl} target="_blank">
                        <LinkedinOutlined /> LinkedIn Profile
                      </Link>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>

      <Card title="Assignment" className="mt-4">
        {company.Assign && company.Assign.User ? (
          <>
            <Descriptions bordered>
              <Descriptions.Item label="Assigned To">
                <UserOutlined /> {`${company.Assign.User.userName} ${company.Assign.User.userLastName}`}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{company.Assign.User.userEmail}</Descriptions.Item>
            </Descriptions>
            <div className="mt-4">
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <Text strong>Actions:</Text>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setIsModalOpen(true);
                    setAssignId(company.Assign?.assignId);
                    }}>
                  Create Action
                </Button>
              </Space>
              {company.Assign.Action && company.Assign.Action.length > 0 ? (
                <List
                  className="mt-4"
                  itemLayout="horizontal"
                  dataSource={company.Assign.Action}
                  renderItem={(action: Action) => (
                    <List.Item>
                      <List.Item.Meta
                        title={action.actionTitle}
                        description={
                          <Space direction="vertical">
                            <Text>{action.actionDescription}</Text>
                            <Space>
                              <CalendarOutlined />
                              <Text>{new Date(action.actionDate).toLocaleDateString()}</Text>
                            </Space>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Text className="mt-4 block">No actions yet.</Text>
              )}
            </div>
          </>
        ) : (
          <Button type="primary" onClick={() => onAssign(company.companyId)}>
            Assign Company
          </Button>
        )}
      </Card>
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(action) => {
          onCreateAction(company.companyId, action)
          setIsModalOpen(false)
        }}
        assignId={assignId}
      />
    </Card>
  )
}

export default CompanyDetails

