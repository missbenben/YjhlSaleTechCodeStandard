import React, { Component } from 'react';
import FileButton from './FileButton'

class Tree extends Component {

render(){
    const {bim,access} = this.props
        return (
            <div className="tree" >
                {this.props.file &&  this.props.file.map( f => <FileButton key={f.code}
                                                                           fname={f.name}
                                                                           fkey={f.code}
                                                                           fstatus={f.status}
                                                                           bim={bim}
                                                                           access={access}
                />)}
            </div>
        )
    }

}

export default Tree;
