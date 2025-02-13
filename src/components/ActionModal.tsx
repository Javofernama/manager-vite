import type React from "react"
import { Modal, Form, Input, Select, DatePicker } from "antd"
import type { Action } from "../interfaces/company"

const { TextArea } = Input

interface ActionModalProps {
  isOpen: boolean
  assignId: number | undefined
  onClose: () => void
  onSubmit: (action: Omit<Action, "actionId">) => void
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, assignId, onClose, onSubmit }) => {
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newAction: Omit<Action, "actionId"> = {
        assignId,
        actionTitle: values.actionTitle,
        actionDescription: values.actionDescription,
        actionDate: values.actionDate.toISOString(),
        actionType: values.actionType,
        actionState: false,
      }
      onSubmit(newAction)
      form.resetFields()
    })
  }

  return (
    <Modal title="Formulario para crear una nueva acción" open={isOpen} onCancel={onClose} onOk={handleSubmit}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="actionTitle"
          label="Titulo de la acción"
          rules={[{ required: true, message: "Por favor ingrese el titulo de la acción!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="actionDescription"
          label="Breve descripción"
          rules={[{ required: true, message: "Por favor ingrese una breve descripción!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="actionType"
          label="Tipo"
          rules={[{ required: true, message: "Por favor escoja un tipo!" }]}
        >
          <Select>
            <Select.Option value="Llamado">Llamado</Select.Option>
            <Select.Option value="Reunión">Reunión</Select.Option>
            <Select.Option value="Email">Email</Select.Option>
            <Select.Option value="Tarea">Tarea especifica</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="actionDate"
          label="Fecha"
          rules={[{ required: true, message: "Por favor escoja una fecha en la que llevará a cabo esta acción!" }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ActionModal

