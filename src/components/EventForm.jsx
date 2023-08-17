import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, DatePicker, Select, TimePicker } from "antd";
import { ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

function EventForm({ onSubmit, onClose, initialDate,  }) {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  //   const [startTime, setStartTime] = useState(moment());
  //   const [endTime, setEndTime] = useState(moment());
    const employees = [
    { name: "Juan Pérez", color: "red" },
    { name: "María García", color: "blue" },
    { name: "Antonio Gonzalez", color: "green" },
    { name: "Edy Cavani", color: "#FABD05" },
    { name: "cristina samba", color: "purple" },
    { name: "Santiago Compostela", color: "#049BE5" },


  ];

  useEffect(() => {
    if (initialDate) {
      const start = moment(initialDate.day).hours(initialDate.hour).minutes(0);
      const end = start.clone().add(20, "minutes");

      form.setFieldsValue({
        startDate: moment(initialDate.day),
        timeRange: [start, end],
      });
    }
  }, [initialDate, form]);

  const handleSubmit = (values) => {
    const { startDate, timeRange, comments, employee } = values;
    const selectedEmployee = employees.find(emp => emp.name === employee);

    // Extraemos el inicio y fin del rango de tiempo.
    const [startTime, endTime] = timeRange;

    // Incorporamos las horas y minutos al startDate.
    const eventStartDate = startDate.clone().hours(startTime.hours()).minutes(startTime.minutes());
    const eventEndDate = startDate.clone().hours(endTime.hours()).minutes(endTime.minutes());

    onSubmit({
      startDate: eventStartDate.toDate(),
      endDate: eventEndDate.toDate(),
      comments,
      employee: selectedEmployee.name,   // Aquí solo guardamos el nombre del empleado.
      color: selectedEmployee.color     // Guardamos también el color del empleado seleccionado.
    });
    formRef.current.resetFields();
};


  return (
    <Form ref={formRef} form={form} layout='vertical' onFinish={handleSubmit}>
      <Form.Item
        label='Empleado'
        name='employee'
        rules={[
          { required: true, message: "Por favor selecciona un empleado!" },
        ]}
      >
        <Select placeholder='Selecciona un empleado'>
          {employees.map((emp) => (
            <Option key={emp.name} value={emp.name}>
              {emp.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label='Fecha de inicio'
        name='startDate'
        rules={[
          {
            required: true,
            message: "Por favor selecciona la fecha de inicio!",
          },
        ]}
      >
        <DatePicker format='DD-MM-YYYY' />
      </Form.Item>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "60%",
          justifyContent: "space-between",
        }}
      >
        <Form.Item
          label='Rango de tiempo'
          name='timeRange'
          rules={[
            {
              required: true,
              message: "Por favor selecciona el rango de tiempo!",
            },
          ]}
        >
          <TimePicker.RangePicker
            format='HH:mm'
            onChange={(times) => {
              if (times && times[0]) {
                const end = times[0].clone().add(20, "minutes");
                form.setFieldsValue({ timeRange: [times[0], end] });
              }
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label='Comentarios' name='comments'>
        <Input.TextArea placeholder='Añade tus comentarios aquí' />
      </Form.Item>

      <Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button
            style={{ backgroundColor: "green", height: "auto" }}
            type='primary'
            htmlType='submit'
          >
            Enviar
          </Button>
          <Button
            type='danger'
            onClick={onClose}
            style={{ backgroundColor: "red", height: "auto" }}
            icon={<CloseCircleOutlined />}
          >
            Cerrar
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default EventForm;
