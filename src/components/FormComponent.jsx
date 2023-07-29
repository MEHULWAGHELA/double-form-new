import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import validationdata from '../JSON/validation.json'
import { Cardcontext } from '../App'
import CardComponent from './CardComponent'
const FormComponent = () => {
    let value = useContext(Cardcontext)
    const fileref = useRef()
    let [errorobj, seterrorobj] = useState({})
    const getBase64 = (file) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject('Error: ', error);
    })
    const changedata = async (e) => {
        if (e.target.name == "image") {
            value.obj[e.target.name] = await getBase64(e.target.files[0])
        }
        else {
            value.obj[e.target.name] = e.target.value
        }
        value.setobj({ ...value.obj })
        // validate(e.target.name)
    }

    const save = (e) => {
        // for (let x of Object.keys(value.obj)) {
        //     validate(x)
        // }
        e.preventDefault()
        if (value.editid == 0) {
            value.count = value.count + 1
            value.obj.id = value.count
            console.log(value.obj)
            value.array.push(value.obj)
        }
        else {
            value.editid = 0;
            value.array.splice(value.array.findIndex(x => x.id == value.editid), 1, value.obj)
        }
        value.setobj({ ...value.obj })
        value.setarray([...value.array])
        value.setcount(value.count)
        value.setobj({})
        value.seteditid(value.editid)
        fileref.current.value = ""
    }

    // const validate = (name) => {
    //     let validationobj = validationdata.find((x) => x.name == name)
    //     let validationerror = validationobj.conditions.find((x) => eval(x.condition))
    //     if (validationobj) {
    //         if (validationerror) {
    //             errorobj[name] = validationerror.error
    //         }
    //         else {
    //             delete errorobj[name]
    //         }
    //     }
    // }
    return (
        <div>
            <div className="container text-bg-dark rounded-3 py-5 my-3">
                <h1 className='text-center py-3'>First Form</h1>
                <Form className=''>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="title" className='fs-5'>
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={value.obj.title || ''}
                                    placeholder='Add Title'
                                    onChange={changedata}
                                />
                                <span>{errorobj.title}</span>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="subtitle" className='fs-5'>
                                    SubTitle
                                </Label>
                                <Input
                                    id="subtitle"
                                    name="subtitle"
                                    type="text"
                                    value={value.obj.subtitle || ''}
                                    placeholder="Sub Title"
                                    onChange={changedata}
                                />
                                <span>{errorobj.subtitle}</span>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="image" className='fs-5'>
                                    Image
                                </Label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    placeholder='File'
                                    onChange={changedata}
                                    ref={fileref}
                                    className='form-control'
                                />
                                <span>{errorobj.image}</span>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="button" className='fs-5'>
                                    Button
                                </Label>
                                <Input
                                    id="button"
                                    name="button"
                                    type="text"
                                    value={value.obj.button || ""}
                                    placeholder='Add Button'
                                    onChange={changedata}
                                />
                            </FormGroup>
                            <span>{errorobj.button}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="information" className='fs-5'>
                                    Information
                                </Label>
                                <Input
                                    id="information"
                                    name="information"
                                    placeholder="Enter Description"
                                    type='textarea'
                                    value={value.obj.information || ""}
                                    onChange={changedata}
                                />
                            </FormGroup>
                            <span>{errorobj.information}</span>
                        </Col>
                    </Row>
                    <div className='text-center'>
                        <Button className='' onClick={save}>
                            Sign in
                        </Button>
                    </div>
                </Form>
            </div>
            <CardComponent value={value.array} >
                <thead>
                    <tr>
                        <th>
                            Sr No.
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            SubTitle
                        </th>
                        <th>
                            Image
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
            </CardComponent >
        </div>
    )
}

export default FormComponent
