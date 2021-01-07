import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { constaApi } from 'constants/constants';
import Select from 'react-select';
import NotificationAlert from "react-notification-alert";


export default function AddEditReminders(props) {
    // variables
    const { id: IDX } = useSelector(state => state.auth);
    const [selectValue, setSelectValue] = useState();
    const { contact } = props;
    const { register, handleSubmit, errors, reset, watch } = useForm({ mode: "onChange" });
    const [modal, setModal] = useState(false);
    const [nameContact, setNameContact] = useState(contact.name + ' ' + (contact.father_lastname ?? '') + ' ' + (contact.mother_lastname ?? ''));
    const [subject, setSubject] = useState("");
    const [users, setUsers] = useState([{}]);
    const [timeReminder, setTimeReminder] = useState("");
    const [dateReminder, setDateReminder] = useState("");
    const [notificationReminder, setNotificationReminder] = useState();
    const [notes, setNotes] = useState("");
    const [departament, setDepartament] = useState("");
    const [values, setValues] = useState([{}]);
    const notificationAlert = useRef();
    useEffect(() => {
        consult();
    }, [])
    // Methods
    function changeSubject (e) {
        setSubject(e.target.value);
    }
    function changeDepartament(e){
        setDepartament(e.target.value);
    }
    function changeNotes (e) {
        setNotes(e.target.value);
    }
    function changeTimeReminder (e) {
        setNotificationReminder(e.target.value);
    }
    function changeDate (e) {
        setDateReminder(e.target.value)
    }
    function changeTime(e){
        setTimeReminder(e.target.value);
    }
    const handleChange = (e) => {
        setSelectValue(e);
    }
    const consult = async () => {
        let data = {
            id: contact.id,
            idx: IDX
        };
        let result = [];
        await axios.post(constaApi + 'defaultSelectBio', data)
            .then(function (response) {
                let { users } = response.data;
                users.forEach(us => {
                    result.push({
                        id : us.id,
                        value: us.name,
                        label: us.name,
                        email: us.email,
                        fullname: us.name + ' ' + us.father_lastname + ' ' + us.mother_lastname,
                        type: 'user',
                    })
                });
                setValues(result);
            });
    }
    function showModal() {
        setModal(!modal);
    }
    async function onSubmit(data) {
        let datex = dateReminder + " " + timeReminder;
        let obj = {
            contact: nameContact ?? null,
            subject: subject ?? null,
            emailTo : selectValue ?? null,
            dateReminder : datex ?? null,
            timenotification : notificationReminder ?? null,
            notes : notes ?? null,
            departament : departament ?? null,
        };
        console.log(obj,'OBJ');
    }
    function handleClose() {
        setModal(!modal);
    }
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };
    function notification(type, message) {
        let place = "tc";
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7,
        }

        notificationAlert.current.notificationAlert(options);
    }

    return (
        <div className="mt-n5">
            <button onClick={(e) => showModal()} className="btn btn-primary">
                <span className="Inter"
                    style={{ fontSize: "18px" }}>+</span> Recordatorio</button>

            <Modal
                style={{ marginTop: "50px" }}
                dialogClassName="modal-90w"
                show={modal}
                onHide={e => handleClose()}
            >
                <Modal.Header style={{ height: "60px" }} closeButton>
                    <Modal.Title style={{ fontFamily: "Inter", marginTop: "5px", fontWeight: "600", fontSize: "18px" }}>Agregar Recordatorio </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col>
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control name="name"
                                        disabled
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre"
                                        value={nameContact}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-8">
                                    <Form.Label className="formGray">Asunto</Form.Label>
                                    <Form.Control name="subject"
                                       onChange = {(e) => changeSubject(e)}
                                       autoComplete="off" className="formGray" type="text" placeholder="Escriba el asunto..."
                                       value={subject}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Label className="formGray">Usuarios</Form.Label>
                                    {values &&
                                        <Select
                                            isMulti
                                            name="values"
                                            value={selectValue}
                                            onChange={(e) => handleChange(e)}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecciona un usuario"
                                            isLoading={true}
                                            options={values}
                                        />
                                    }
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                    <Col >
                                        <Form.Control style={{ height: '100px', width: '180px' }}
                                            onChange={(e) => changeDate(e)}
                                            value={dateReminder} autoComplete="off" name="date"
                                            className="formGray" type="date" placeholder="Ingrese su Fecha" />
                                    </Col>
                                    <Col className="mt-4">
                                        <Form.Control style={{ height: '30px', width: '120px' }}
                                            onChange={(e) => changeTime(e)}
                                            value={timeReminder} autoComplete="off" name="date"
                                            className="formGray" type="time" placeholder="Ingrese su Fecha" />
                                    </Col>
                                    <Col className="col-5">
                                    <Form.Label className="formGray">Notificación</Form.Label>
                                    <Form.Control  onChange={(e) => changeTimeReminder(e)}
                                     autoComplete="off" 
                                     value={notificationReminder} name="type"  as="select" size="sm" custom>
                                      <option disabled value="" selected></option>
                                       <option value="misma hora">Misma hora</option>
                                       <option value="1 hora antes">1 Hora Antes</option>
                                       <option value="1 dia antes">1 Dia Antes</option>
                                       <option value="2 dias antes">2 Dias Antes</option>
                                       <option value="1 semana antes">1 Semana Antes</option>
                                    </Form.Control>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                    <Form.Label className="formGray">Notas</Form.Label>
                                    <InputGroup  style={{ borderTop: '0', width: '100%', marginTop: '0px' }}>
                                        <Form.Control
                                            onChange={(e) => changeNotes(e)}
                                            value={notes} as="textarea" placeholder="Escriba su mensaje..." rows={8} />
                                    </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-6">
                                    <Form.Label className="formGray">Departamento</Form.Label>
                                    <Form.Control  onChange={(e) => changeDepartament(e)}
                                     autoComplete="off" 
                                     value={departament} name="type"  as="select" size="sm" custom>
                                      <option disabled value="" selected></option>
                                       <option value="prospeccion">Prospección</option>
                                       <option value="aplicacion">Aplicación</option>
                                       <option value="general">General</option>
                                    </Form.Control>
                                    </Col>
                                </Row>
                                
                        </div>
                        <Row>

                            <Col>
                                <Button
                                    disabled={!subject ? true : !dateReminder ? true : !timeReminder ? true : !notificationReminder ? true : false }
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{ fontFamily: "Inter", fontWeight: "500" }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancelar
                </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>
        </div>


    )
}