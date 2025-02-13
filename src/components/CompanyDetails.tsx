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
      <Descriptions title="Información de la compañia" bordered>
        <Descriptions.Item label="Dirección">{company.companyAddress}</Descriptions.Item>
        <Descriptions.Item label="Industria">{company.companyIndustry}</Descriptions.Item>
        <Descriptions.Item label="Ganancias">{company.companyRevenue}</Descriptions.Item>
        <Descriptions.Item label="Website">
          <Link href={company.companyWebsite} target="_blank">
            <GlobalOutlined /> {company.companyWebsite}
          </Link>
        </Descriptions.Item>
        <Descriptions.Item label="Telefono">
          <PhoneOutlined /> {company.companyPhone}
        </Descriptions.Item>
      </Descriptions>

      <Collapse defaultActiveKey={["1"]} className="mt-4">
        <Panel header="Contactos" key="1">
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

      <Card title="Asignaciones" className="mt-4">
        {company.Assign && company.Assign.User ? (
          <>
            <Descriptions bordered>
              <Descriptions.Item label="Asignado a:">
                <UserOutlined /> {`${company.Assign.User.userName} ${company.Assign.User.userLastName}`}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{company.Assign.User.userEmail}</Descriptions.Item>
            </Descriptions>
            <div className="mt-4">
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <Text strong>Acciones:</Text>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setIsModalOpen(true);
                    setAssignId(company.Assign?.assignId);
                    }}>
                  Crear una acción
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
                            <Text>Tipo de acción: {action.actionType}</Text>
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
                <Text className="mt-4 block">Sin acciones aún.</Text>
              )}
            </div>
          </>
        ) : (
          <Button type="primary" onClick={() => onAssign(company.companyId)}>
            Asigname la compañia
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

