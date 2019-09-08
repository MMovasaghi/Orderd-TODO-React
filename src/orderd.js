import React from 'react';
import {Container, Button, Input, ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class Orderd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            list: [
                {
                    title: 'title1',
                    content: 'Content1',
                    order: 3
                },
                {
                    title: 'title2',
                    content: 'Content2',
                    order: 2
                },
                {
                    title: 'title3',
                    content: 'Content3',
                    order: 1
                }
            ],
            title: null,
            content: null,
            order: null
        };
        this.toggle = this.toggle.bind(this);
    };
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            title:null,
            content:null,
            order:null
        }));
    };
    Save = () => {
        this.setState(prevState => {
            const {list} = prevState;
            list.sort((a,b) => (a.order > b.order) ? 1 : -1);
            return {list};
        });
    }
    add = () => {
        this.setState(prevState => {
            const {list,title,order,content} = prevState;
            list.push(
                {
                    title: title,
                    content: content,
                    order: order
                }
            );
            return {list};
        });
        this.toggle();
    };
    del = index => {
        this.setState(prevState => {
            const {list} = prevState;
            list.splice(index,1);
            return {list};
        });
    };
    setTitle = e => {
        this.setState({
            title: e.target.value
        });
    };
    setContent = e => {
        this.setState({
            content: e.target.value
        });
    };
    setOrder = e => {
        this.setState({
            order: e.target.value
        });
    };
    render() {
        const {list} = this.state;
        return (
            <Container>
                <Button className="btn btn-danger btn-primary btn-lg col-sm-8 mt-4" onClick={this.toggle}>Add Data</Button>
                <Button className="btn btn-success btn-primary btn-lg col-sm-3 float-right mt-4" onClick={this.Save}>Save</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Data</ModalHeader>
                    <ModalBody>
                        <Input onChange={this.setTitle} placeholder="Title" className="mt-2"/>
                        <Input onChange={this.setContent} placeholder="Content" className="mt-2"/>
                        <Input onChange={this.setOrder} placeholder="Order" className="mt-2"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.add}>Add</Button>
                        {' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <ListGroup md={4} className="mt-4">
                    {
                        list.map((item,index)=> {
                            return (
                                <ListGroupItem md={2} className="mt-2" key={index}>
                                    <ListGroupItemHeading>
                                        <button type="button" className="close" onClick={this.del.bind(this,index)} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <h4>{item.title}</h4>                                        
                                    </ListGroupItemHeading>
                                    <hr/>
                                    <ListGroupItemText>
                                        {item.content}
                                    </ListGroupItemText>
                                    <hr/>
                                    <small>Order Number : {item.order} </small>
                                </ListGroupItem>
                            );
                        })
                    }
                </ListGroup>
            </Container>
        );
    };
}
export default Orderd;