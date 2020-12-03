import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import * as GrIcons from 'react-icons/gr';
import { Row, Col, Button, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import axios from 'axios';



function MultipleModals() {
    // states
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [extra, setExtra] = useState(false);
    const [validField, setvalidField] = useState(true);
    const [validFieldTwo, setvalidFieldTwo] = useState(true);
    const [validFieldThree, setvalidFieldThree] = useState(true);
    const [validFieldFour, setvalidFieldFour] = useState(true);
    const [validFieldFive, setvalidFieldFive] = useState(true);
    const [validFieldSix, setvalidFieldSix] = useState(true);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [auth, setAth] = useState([]);
    const [idContact,setIDContact] = useState(null);
    const [program, setProgram] = useState(["Boarding Schools",
    "Año Escolar",
    "Summer Camps",
    "Cursos de Idiomas",
    "Carreras & Maestrias",
    "Au Pair"]);
    const years = [
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025,
        2026,
        2027,
        2028,
        2029,
        2030
    ];
    useEffect(() => {
        // console.log('states',years);
        consultStates();
        setExtra(false);

        // console.log('states', states);
        // console.log('cities', cities);
    }, []);

    function changeCities(e) {
        console.log('Cambio', e.target.value)
        let val = e.target.value;
        axios.get('https://www.universal-tutorial.com/api/cities/' + val, {
            headers: {
                Authorization: 'Bearer ' + auth,
                Accept: "application/json"
            }
        }).then(function (response) {
            setCities(response.data);
        });
    }
    // Api to states
    async function consultStates() {
        //    info : L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI
        let x = null;
        await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
            headers: {
                "Accept": "application/json",
                "user-email": "18090130@gmail.com",
                "api-token": "L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI"
            }
        }).then(function (response) {
           x = response.data.auth_token;
            // console.log('Auth',auth);
        });
        axios.get('https://www.universal-tutorial.com/api/states/Mexico', {
            headers: {
                Authorization: 'Bearer ' + x,
                Accept: "application/json"
            }
        }).then(function (response) {
            setStates(response.data);
            setAth(x);


        });

    }
    // Register to save data
    const { register: student, handleSubmit, errors, formState,reset: reset } = useForm({
        // defaultValues:{
        //     email: 'example@email.com'
        // }, 
        mode: 'onChange' }
        );
    const { register: reference, handleSubmit: handleSubmitReference, errors: errorsReference, formState: formStateReference, reset:resetReference
     } = useForm({ mode: 'onChange' });
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };
    const [addrtype, setAddrtype] = useState(["Papa", "Mama", "Hermano/Hermana", "Otro"])
    const Add = addrtype.map(Add => Add
    )
    // function showReference (e){
    //     console.log('e',e.target.value);
    //     console.log('extra',extra);
    // }
    const showOtherReference = (e) => {
        if (e.target.value) {
            setvalidFieldFour(false);
        } else {
            setvalidFieldFour(true);
        }
    }
    const showReference = (e) => {
        if ((addrtype[e.target.value]) == "Otro") {
            setExtra(true);
            setvalidFieldFour(true);
        } else {
            setExtra(false);
            setvalidFieldFour(false);
        }
        if (e.target.value) {
            setvalidFieldThree(false);
        } else {
            setvalidFieldThree(true);
        }
    }

    function handleValidEmail(e){
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    }
    function handlevalidPhone(e) {
        // console.log('e', e.target.value);
        let regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        // if (!regex.test(e.target.value)) {
        //     setvalidFieldTwo(true);
        // } else {
        //     setvalidFieldTwo(false);

        // }

    }
    function valid() {
        return validField;
    }
    function validTwo() {
        return validFieldTwo;
    }
    // function to view modals
    const showModal1 = function close() {
        setvalidField(true);
        setModal2(false);
        setModal3(false);
        setModal4(false);
        setModal1(true);
    };
    const showModal2 = function close() {
        setModal1(false);
        setModal2(true);
    };
    const showModal3 = function close() {
        setvalidFieldThree(true);
        setExtra(false);
        setModal1(false);
        setModal2(false);
        setModal4(false);
        setModal3(true);
    };
    const showModal4 = function close() {
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setModal4(true);
    };
    const handleClose = function close() {
        reset();
        resetReference();
        setvalidField(true);
        setExtra(false);
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setModal4(false);
    }
    const handleExtra = function ekis() {
        setExtra(state => !state);
    }
    function handlevalidTwo(e) {
        if (e.target.value) {
            setvalidFieldTwo(false);
        } else {
            setvalidFieldTwo(true);
        }
        // console.log(e.target.value);
    }
    function handleValid(e) {
        if (e.target.value) {
            setvalidField(false);
        } else {
            setvalidField(true);
        }
        // console.log(e.target.value);
    }
    function handlevalidFive(e){
        if(e.target.value) {
            setvalidFieldFive(false);
        } else {
            setvalidFieldFive(true);
        }
    }
    function handlevalidSix(e){
        // console.log('Holas',e.target.value);
        if(e.target.value) {
            setvalidFieldSix(false);
        } else {
            setvalidFieldSix(true);
        }
    }
    function handlevalidFour(e) {
        if (e.target.value) {
            setvalidFieldFour(false);
        } else {
            setvalidFieldFour(true);
        }
        // console.log(e.target.value);
    }
    async function onSubmit(data) {
        if(modal1 === true){
            console.log('data',data);
           await axios.post('http://api.boardingschools.mx/api/contacts',data)
              .then(function (response) {
                console.log(response);
                setIDContact(response.data.id);
              });
            showModal2();
        }
        if(modal3 === true){
            data.idContact = idContact;
            await axios.post('http://api.boardingschools.mx/api/references',data)
            .then(function (response) {
              console.log(response);
            })
            showModal4();
        }
        reset();
        resetReference()
    }


    return (
        <>
            <Button style={{ color: '#182739', marginRight: '10px', backgroundColor: '#FFFFFF', boxShadow: 'rgb(209, 221, 235) 0px 0px 0px 1px inset' }} className=" Inter600" variant="light">Import</Button>
            <Button style={{}} className="Inter600 " variant="primary" onClick={showModal1}>Crear contacto</Button>

            {/* FirstModal */}
            <Modal
                show={modal1}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar contacto </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                            <Col className="col-4">
                                    <Form.Label className="formGray">Programa</Form.Label>
                                    <Form.Control onChange={e => handlevalidFive(e)} autoComplete="off" name="program" ref={student({
                                        required: true
                                    })} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        {program.map(pro => (
                                            <option key={pro} value={pro}>
                                                {pro}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.name && "Programa requerido"}</p>
                                </Col>
                                <Col className="col-2">
                                    <Form.Label className="formGray">Año</Form.Label>
                                    <Form.Control onChange={e => handlevalidSix(e)} autoComplete="off" name="year" ref={student({
                                        required: true
                                    })} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        {years.map(y => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.year && "Año requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                            <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control onChange={e => handleValid(e)} name="name" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre"
                                        style={{ ...styles.input, borderColor: errors.name && "red" }}
                                    />
                                    <p className='errores'>{errors.name && "Nombre requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control onChange={e => handlevalidTwo(e)} name="father_lastname" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                    <p className='errores'
                                    >{errors.father_lastname && "Apellido requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" name="mother_lastname" ref={student}
                                        className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                    <p className='errores'
                                    >{errors.mother_lastname && "Apellido requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control autoComplete="off" name="birthday" ref={student}
                                        className="formGray" type="date" placeholder="Ingrese su Fecha" />
                                    <p className='errores'>{errors.date && "Fecha requerida"}</p>
                                </Col>

                            </Row>
                            <Row className="mt-1">
                                <Col className="col-3">
                                    <Form.Label className="formGray">Grado</Form.Label>
                                    <Form.Control autoComplete="off" name="grade" ref={student} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        <option value="Grado 1">Grado 1</option>
                                        <option>Grado 2</option>
                                        <option>Grado 3</option>
                                        <option>Grado 4</option>
                                        <option>Grado 5</option>
                                        <option>Grado 6</option>
                                        <option>Grado 7</option>
                                        <option>Grado 8</option>
                                        <option>Grado 9</option>
                                        <option>Grado 10</option>
                                        <option>Grado 11</option>
                                        <option>Grado 12</option>
                                    </Form.Control>
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">Ciclo escolar</Form.Label>
                                    <Form.Control autoComplete="off" name="cicly" ref={student} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        <option value="2015-2016">2015 - 2016</option>
                                        <option>2016 - 2017</option>
                                        <option>2017 - 2018</option>
                                        <option>2018 - 2019</option>
                                        <option>2019 - 2020</option>
                                        <option>2020 - 2021</option>
                                        <option>2021 - 2022</option>
                                        <option>2022 - 2023</option>
                                        <option>2023 - 2024</option>
                                        <option>2024 - 2025</option>
                                        <option>2025 - 2026</option>
                                        <option>2026 - 2027</option>
                                        <option>2027 - 2028</option>
                                        <option>2028 - 2029</option>
                                        <option>2029 - 2030</option>
                                        <option>2030 - 2031</option>
                                    </Form.Control>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Colegio</Form.Label>
                                    <Form.Control autoComplete="off" name="schoool" ref={student}
                                        className="formGray" type="text" placeholder="Ingrese su Colegio" />
                                    <p className='errores'>{errors.school && "Colegio requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control  autoComplete="off" name="email"
                                        ref={student({
                                            required:false,
                                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                        })}
                                        className="formGray" type="email" placeholder="Ingrese su email" />
                                    <p className='errores'>{errors.email && "Formato invalido"}</p>

                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control onChange={e => handlevalidPhone(e)} autoComplete="off" name="phone" ref={student({
                                        pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                        maxLength: 10
                                    })}
                                        className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                    <p className='errores'>{errors.phone && "Formato invalido,solo 10 digitos"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control onChange={e => changeCities(e)} autoComplete="off" name="state" ref={student} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {states.map(state => (
                                            <option key={state.state_name} value={state.state_name}>
                                                {state.state_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.state && "Estado requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" name="city" ref={student} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        {cities.map(state => (
                                            <option key={state.city_name} value={state.city_name}>
                                                {state.city_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.state && "Estado requerido"}</p>
                                </Col>

                            </Row>

                        </div>
                        <Row>

                            <Col>
                                <Button
                                    disabled={valid() || validTwo() || validFieldFive || validFieldSix}
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{ color: '#4479ff', fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="light" >
                                    Cancel
                </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>


            {/* Second Modal */}
            <Modal
                style={{ height: '604px', maxHeight: '604px' }}
                show={modal2}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="container">
                        <div className="row">
                            <div className="mx-auto">
                                <h1 className="Inter600B">Contacto Guardado!</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <span className="Inter500" > ¿Qué mas te gustaría hacer?</span>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <button className="btn btn-primary Inter600" onClick={showModal3}>Agregar una referencia</button>

                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <button style={{ width: '181.13px' }} onClick={showModal1} className="btn btn-primary Inter600">Agregar un contacto</button>

                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <a className="Inter500B" onClick={handleClose}>Listo!</a>
                        </div>
                    </div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                </Modal.Body>
            </Modal>



            {/* Three Modal */}
            <Modal
                show={modal3}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar referencia</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                <form onSubmit={handleSubmitReference(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Tipo de referencia</Form.Label>
                                    < select
                                    ref={reference({
                                        required: true
                                    })} 
                                    name="type_ref"
                                        onChange={e => showReference(e)}
                                        className="browser-default custom-select" >
                                        {
                                            Add.map((address, key) => <option value={key}>{address}</option>)
                                        }
                                    <option disabled value= "" selected ></option>
                                    </select >

                                </Col>
                                {extra &&
                                    <Col className="col-6">
                                        <Form.Label className="formGray">Referencia</Form.Label>
                                        <Form.Control autoComplete="off"  onChange={e => showOtherReference(e)} ref={reference({
                                    })} 
                                    name="name_ref"
                                     className="formGray" type="text" placeholder="Ingrese la referencia" />
                                    </Col>

                                }
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control  ref={reference({})} name="name" onChange={e => handlevalidFour(e)} autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="father_lastname" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="mother_lastname" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="email" className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="phone" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-1">

                            <Col>
                                <Button 
                                disabled={validFieldThree || validFieldFour}
                                className="float-right mb-3 mr-2" type="submit" variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{ color: '#4479ff', fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="light" >
                                    Cancel
</Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>

            </Modal>



            {/* Four Modal */}
            <Modal
                show={modal4}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar Referencia</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="container">
                        <div className="row">
                            <div className="mx-auto">
                                <h1 className="Inter600B">Referencia Guardada!</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <span className="Inter500" > ¿Te gustaria agregar otra referencia?</span>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <button className="btn btn-primary Inter600" onClick={showModal3}>Agregar una referencia</button>

                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <button style={{ width: '181.13px' }} onClick={showModal1} className="btn btn-primary Inter600">Agregar un contacto</button>

                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <a className="Inter500B" onClick={handleClose}>Terminar</a>
                        </div>
                    </div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                </Modal.Body>

            </Modal>
        </>
    )
}

/* <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="date" placeholder="Ingrese su fecha" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Ciudad" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Calle</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Calle" />
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">No.</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Numero" />
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">Codigo postal</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Codigo" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado Civil</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado civil" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <a onClick={handleExtra}>
                                        <GrIcons.GrAdd /> Agregar mama
                                </a>
                                </Col>
                                {extra && (
                                    <div className="container-fluid">
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Nombre</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Apellido Materno</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Email</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="email" placeholder="Ingrese su email" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Telefono</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su email" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Ciudad</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su telefono" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="date" placeholder="Ingrese su email" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Ciudad</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Ciudad" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Calle</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Calle" />
                                            </Col>
                                            <Col className="col-3">
                                                <Form.Label className="formGray">No.</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Numero" />
                                            </Col>
                                            <Col className="col-3">
                                                <Form.Label className="formGray">Codigo postal</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Codigo" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado Civil</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado civil" />
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </Row>
                        </div>
*/

export default MultipleModals


