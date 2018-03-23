import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchStuff } from '../modules/stuff';
import PropTypes from 'prop-types';
import React from 'react';

class stuffList extends React.Component {
    componentWillMount() {
        this.props.fetchStuff();
    }

    renderData = (item) => {
        return <div key={item.id}>{item.name}</div>;
    }

    render() {
        if(!this.props.stuff){
            return (
                <div>
                    { 'Loading Stuff...' }
                </div>
            )
        }else{
            return (
                <div className="">
                    {
                        this.props.stuff.map((item) => {
                            return (
                                this.renderData(item)
                            );
                        })
                    }
                </div>
            )
        }
    }
}

stuffList.propTypes = {
    fetchStuff: PropTypes.func.isRequired,
    stuff: PropTypes.array
};

function mapStateToProps(state) {
    return {
        stuff: state.stuff
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchStuff,
  }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(stuffList);
