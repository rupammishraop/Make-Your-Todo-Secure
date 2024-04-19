import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { TodoForm } from './TodoForm';

function AddTodo({ popUp, setPop }) {
    return (
        <div>
            <Modal size="lg" isOpen={popUp} toggle={() => setPop(!popUp)}>
                <ModalHeader className="w-full" toggle={() => setPop(!popUp)} cssModule={{}}>
                    <p className='w-full m-auto text-center'>Enter Todo</p>
                </ModalHeader>
                <ModalBody>
                    <div className="flex justify-center flex-col items-center align-middle w-full border-4 p-2">
                        <div className="flex justify-center w-full">
                            <TodoForm />
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddTodo