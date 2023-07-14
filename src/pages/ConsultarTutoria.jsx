import { toast } from "react-hot-toast";
import Navbar from "../partials/Navbar";

const URL_BACKEND_ASIGNATURAS='http://localhost:8080/asignatura/asignaturas';

export default function ConsultarTutoria (){
    const [select, setSelect]=React.useState((""));
    const [dataConsulta, setDataConsulta]=React.useState({
        inputConsulta:"", inputStart:"", inputEnd:"", asignatura:""
    });
    const [arrayAsignaturas, setArrayAsignaturas]=React.useState([]);
    const [ConsultaFilled, setConsultaFilled]=React.useState([]);

    function handleInputChange(event){
        const {name, value}=event.target;
        setDataConsulta(prev => {
            return {
                ...prev, [name]:value
            }
        });
    }

    
    function handleMainSelect(event){
        setSelect(event.target.value);
    }

  /*  
    React.useEffect(() => {
        fetch(URL_BACKEND_ASIGNATURAS)
        .then((res) => res.json())
        .then((data) => setArrayAsignaturas(data))
        .catch((error) => toast.error(error));
    }, [])
    */
/*
    function handleSubmit(event){
        event.preventDefault();
        fetch(URL_BACKEND_FILTRADO1, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataConsulta)
        })
        .then((res) => res.json())
        .then((data) => setConsultaFilled(data))
        .catch((error) => toast.error(error));
    }
*/

    return (
        <div>
            <Navbar />
            <div className="consultarContainer">
            <section className="consultar-boxSelect">
                <div className="headBox">
                    <h2>Consultas de tutorias</h2>
                    <select name="selectFiltrado" onChange={handleInputChange} required>
                    <option value="" selected>Seleccione el metodo de filtrado</option>
                    <option value="estudiante">Filtrar por estudiante</option>
                    <option value="horario">Filtrar por horario</option>
                    <option value="asignatura">Filtrar por asignatura</option>
                </select>
                </div>
            </section>
            <section className="consultar-boxInput">
                    {dataConsulta.selectFiltrado==="estudiante" &&
                        <input name="inputConsulta" type="text" placeholder="Documento del estudiante" onChange={handleInputChange} required/>}
                    {dataConsulta.selectFiltrado==="horario" &&
                        <div className="dateBox">
                            <h3>Fecha de la tutoria</h3>
                            <input name="inputDate" type="date" id="date"  onChange={handleInputChange}required/>

                            <br/>
                            <h3>Hora de inicio</h3>
                            <input name="inputEnd" type="time" id="start" onChange={handleInputChange} required/>
                            <br />
                            <h3>Hora de finalización</h3>
                            <input name="inputStart" type="time" id="end" onChange={handleInputChange} required/>
                        </div>
                    }
                    {dataConsulta.selectFiltrado==="asignatura" &&
                        <select name="asignatura" onChange={handleMainSelect} required>
                            <option value="" selected>Seleccione una asignatura</option>
                            {/*{arrayAsignaturas.map((asignatura, index) => 
                                <option value={asignatura.id} key={index}>{asignatura.nombre}</option>
                            )}*/}
                        </select>
                    }
            </section>
            */
            <button className="btnConsultar">Consultar</button>
            </div>
        </div>
    )
}