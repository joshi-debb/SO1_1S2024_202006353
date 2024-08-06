
import React, { useState } from 'react';
import Graph from 'graphviz-react';

function SateChange() {
    const [pid, setPID] = useState('');
    const [dot, setDot] = useState('digraph G {\nbgcolor="transparent"}');
    async function nuevo() {
        fetch(`/start`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(response => {
                setPID(response.pid)
            })

        const newdot = ['digraph G {\nbgcolor="transparent" node [style=filled, fillcolor=white];rankdir=LR; edge []'];
        newdot.push('new\n')
        newdot.push('ready\n')
        newdot.push('running [fillcolor=green]\n')
        newdot.push('new -> ready [arrowhead=false]')
        newdot.push('ready -> running [arrowhead=false]')
        newdot.push('}')
        setDot(newdot.join('\n'))
    }

    async function matar() {
        fetch(`/kill?pid=${pid}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(response => {
                setPID('')
            })

        const newdot = ['digraph G {\nbgcolor="transparent" node [style=filled, fillcolor=white];rankdir=LR; edge []'];
        newdot.push('new\n')
        newdot.push('ready\n')
        newdot.push('running\n')
        newdot.push('terminated [fillcolor=green]\n')
        newdot.push('new -> ready [arrowhead=false]')
        newdot.push('ready -> running [arrowhead=false]')
        newdot.push('running -> terminated [color=green]')

        newdot.push('}')
        setDot(newdot.join('\n'))
    }

    async function parar() {
        fetch(`/stop?pid=${pid}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
        const newdot = ['digraph G {\nbgcolor="transparent" node [style=filled, fillcolor=white];rankdir=LR; edge []'];
        newdot.push('new\n')
        newdot.push('ready [fillcolor=green]\n')
        newdot.push('running\n')
        newdot.push('new -> ready [arrowhead=false]')
        newdot.push('running -> ready [color=red]')
        newdot.push('ready -> running [arrowhead=false]')
        newdot.push('}')
        setDot(newdot.join('\n'))
    }
    async function resumir() {
        fetch(`/resume?pid=${pid}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })

        const newdot = ['digraph G {\nbgcolor="transparent" node [style=filled, fillcolor=white];rankdir=LR; edge []'];
        newdot.push('new\n')
        newdot.push('ready\n')
        newdot.push('running [fillcolor=green]\n')
        newdot.push('new -> ready [arrowhead=false]')
        newdot.push('ready -> running [color=green]')
        newdot.push('running -> ready [arrowhead=false]')
        newdot.push('}')
        setDot(newdot.join('\n'))
    }
    return (

        <div className="container">
            <div className="navbar2">
                <h1 className="custom-color2">PROCESS SIMULATOR</h1>
            </div>
            <div>
                <h2>PID: {pid}</h2>
            </div>
            <div>
                <button className='buttons' style={{ marginLeft: '280px',marginRight: '10px' }} onClick={nuevo}>New</button>
                <button className='buttons' style={{ marginRight: '10px' }} onClick={parar}>Stop</button>
                <button className='buttons' style={{ marginRight: '10px' }} onClick={resumir}>Resume</button>
                <button className='buttons' style={{ marginRight: '10px' }} onClick={matar}>Kill</button>
            </div>
            <div className='graphics-content'>
                <div>
                    <Graph
                        dot={dot}
                        options={{zoom:true, height: 200, width: 750 }}
                    />
                </div>

            </div>
        </div>


    );
}

export default SateChange;