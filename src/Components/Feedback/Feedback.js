import React, {useState, useEffect} from 'react';
import {db, firebaseApp} from '../../firebase'
import './Feedback.css'
import img_good from '../../Icons/smile.png';
import img_hmm from '../../Icons/hmm.png';
import img_bad from '../../Icons/bad.png';
import img_feedback from '../../Icons/feedback.png';

import {Button} from "react-bootstrap";

function Feedback (props) {
    // 0 : None, 1 : good, 2 : hmm, 3 : bad

    const [icon, setIcon] = useState(0);
    const [memo, setMemo] = useState('');


    const select_icon = (evt) => {
        var target = evt.target
        document.getElementById(props.id + '-feedback-icon-wrap-good').style.border = 'none'
        document.getElementById(props.id + '-feedback-icon-wrap-hmm').style.border = 'none'
        document.getElementById(props.id + '-feedback-icon-wrap-bad').style.border = 'none'

        if (target.id.endsWith('good')) {
            document.getElementById(props.id + '-feedback-icon-wrap-good').style.border = '1px solid black'
        } else if (target.id.endsWith('hmm')) {
            document.getElementById(props.id + '-feedback-icon-wrap-hmm').style.border = '1px solid black'
        } else if (target.id.endsWith('bad')) {
            document.getElementById(props.id + '-feedback-icon-wrap-bad').style.border = '1px solid black'
        }

        if (target.id.endsWith('good')) {
            setIcon(1)
        } else if (target.id.endsWith('hmm')) {
            setIcon(2)
        } else if (target.id.endsWith('bad')) {
            setIcon(3)
        }
    }

    const close_memo = () => {
        document.getElementById(props.id + '-feedback').setAttribute('style', 'display: none')
    }

    const submit_memo = (evt) => {

        var previous_icon = document.getElementById(props.id + 'feedback-memo')
        if (previous_icon) {
            previous_icon.remove()
        }

        var new_memo = document.getElementById(props.id + '-feedback-memo').value
        setMemo(new_memo)

        db.collection('schedules').doc(props.id).update({
            "memo": new_memo,
            "sat": icon,
        })
            

        document.getElementById(props.id + '-feedback').setAttribute('style', 'display: none')
    }

    const enter_close = () => {
        document.getElementById(props.id + '-feedback-close').style.boxShadow = '5px 5px 2px lightgray'
    }
    const leave_close = () => {
        document.getElementById(props.id + '-feedback-close').style.boxShadow = ''
    }


    return (
        <div className = {'feedback feedback-row' + props.row + '-' + props.data.loc + ' feedback-col' + props.col} id = {props.id + '-feedback'}>
            
            <div className = 'feedback-header-wrap'>
                <button className = "feedback-close-button" id = {props.id + '-feedback-close'}onClick = {_ => {close_memo()}} onMouseEnter = {_ => enter_close()} onMouseLeave = {_ => leave_close()}>&times;</button>
                <img className = 'feedback-icon icon-feedback' src = {img_feedback} width = '16' height = '16' alt = 'feedback'/>
                <p className = 'feedback-text'>How did it go?</p>
            </div>
            <div className = 'feedback-icons'>
                <div className = 'feedback-icon-wrap' id = {props.id + '-feedback-icon-wrap-good'}>
                    <img
                    className = 'feedback-icon'
                    src={ img_good }
                    width='16'
                    height='16'
                    alt='good'
                    id = {props.id + 'feedback-icon-good'}
                    onClick = {evt => select_icon(evt)}/>
                    <span
                    className = 'feedback-icon-text'
                    id = {props.id + '-feedback-text-good'}
                    onClick = {evt => select_icon(evt)}>Great!</span>
                </div>
                <div className = 'feedback-icon-wrap' id = {props.id + '-feedback-icon-wrap-hmm'}>
                    <img
                    className = 'feedback-icon'
                    src={ img_hmm }
                    width='16'
                    height='16'
                    alt='good'
                    id = {props.id + 'feedback-icon-hmm'}
                    onClick = {evt => select_icon(evt)}/>
                    <span
                    className = 'feedback-icon-text'
                    id = {props.id + '-feedback-text-hmm'}
                    onClick = {evt => select_icon(evt)}>Hmm...</span>
                </div>
                <div className = 'feedback-icon-wrap' id = {props.id + '-feedback-icon-wrap-bad'}>
                    <img
                    className = 'feedback-icon'
                    src={ img_bad }
                    width='16'
                    height='16'
                    alt='good'
                    id = {props.id + 'feedback-icon-bad'}
                    onClick = {evt => select_icon(evt)}/>
                    <span
                    className = 'feedback-icon-text'
                    id = {props.id + '-feedback-text-bad'}
                    onClick = {evt => select_icon(evt)}>OMG</span>
                </div>
            </div>
            <textarea className = 'feedback-memo' id = {props.id + '-feedback-memo'} placeholder = 'Leave memo here!'></textarea>
            <div className = 'feedback-done-wrap'>
                <Button className = "btn btn-primary feedback-done" id = 'calendar-prevmonth' onClick = {evt=> {submit_memo(evt)}}>Done</Button>
            </div>
        </div>
    )
}


export default Feedback;