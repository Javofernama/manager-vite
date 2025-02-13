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
    <Modal title="Create New Action" open={isOpen} onCancel={onClose} onOk={handleSubmit}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="actionTitle"
          label="Title"
          rules={[{ required: true, message: "Please input the action title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="actionDescription"
          label="Description"
          rules={[{ required: true, message: "Please input the action description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="actionType"
          label="Type"
          rules={[{ required: true, message: "Please select the action type!" }]}
        >
          <Select>
            <Select.Option value="call">Call</Select.Option>
            <Select.Option value="meeting">Meeting</Select.Option>
            <Select.Option value="email">Email</Select.Option>
            <Select.Option value="task">Task</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="actionDate"
          label="Date"
          rules={[{ required: true, message: "Please select the action date!" }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ActionModal

