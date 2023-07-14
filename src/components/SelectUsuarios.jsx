import {DataContext} from "../contexts/DataContext";

const URL_BACKEND_GETDOCENTES='http://localhost:8080/admin/docentes';
const URL_BACKEND_GETESTUDIANTES='http://localhost:8080/admin/estudiantes';
const URL_BACKEND_GETADMINISTRADORES='http://localhost:8080/admin/admins';
const URL_BACKEND_USUARIOS='http://localhost:8080/admin/encontrarUsuario';
const URL_BACKEND_USUARIOSA='http://localhost:8080/admin/actualizarUsuario';

export default function SelectUsuarios({setFunction}){
    const {setDataUsuario, arrayUsuarios, setArrayUsuarios}=React.useContext(DataContext);
    const [arrayUsuarios2, setArrayUsuarios2]=React.useState([]);
    const [arrayUsuarios3, setArrayUsuarios3]=React.useState([]);
    const [search, setSearch]=React.useState("");


    function handleChangeSelect(event){
        const {value}=event.target;
        fetch(`${URL_BACKEND_USUARIOS}/${value}`)
        .then((res) => res.json())
        .then((data) => setFunction(data))
        .catch((error) => console.log(error));

    }


    React.useEffect(() => {
        fetch(URL_BACKEND_GETDOCENTES)
        .then((res) => res.json())
        .then((data) => setArrayUsuarios(data))
        .catch((error) => console.log(error));

        fetch(URL_BACKEND_GETESTUDIANTES)
        .then((res) => res.json())
        .then((data) => setArrayUsuarios2(data))
        .catch((error) => console.log(error));

        fetch(URL_BACKEND_GETADMINISTRADORES)
        .then((res) => res.json())
        .then((data) => setArrayUsuarios3(data))
        .catch((error) => console.log(error));

    }, []);

    let arrayResult=[];
    if(!search){
        arrayResult=arrayUsuarios;
    }else{
        arrayResult=arrayUsuarios.filter(res => res.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }
    let arrayResult2=[];
    if(!search){
        arrayResult2=arrayUsuarios2;
    }else{
        arrayResult2=arrayUsuarios2.filter(res => res.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }
    let arrayResult3=[];
    if(!search){
        arrayResult3=arrayUsuarios3;
    }else{
        arrayResult3=arrayUsuarios3.filter(res => res.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }

    return (
        <div id="container-selectUsuarios">
            <select name="selectUsuarios" id="selectUsuarios" onChange={handleChangeSelect}>
            <option selected value="">Seleccionar un usuario</option>
            {arrayResult.map((usuario, index) =>
                <option value={usuario.id} key={index}>{usuario.nombre} - {usuario.rol}</option>
            )}
            {arrayResult2.map((usuario, index) =>
                <option value={usuario.id} key={index}>{usuario.nombre} - {usuario.rol}</option>
            )}
            {arrayResult3.map((usuario, index) =>
                <option value={usuario.id} key={index}>{usuario.nombre} - {usuario.rol}</option>
            )}
        </select>
        <input type="search" className="search" onChange={(event) => setSearch(event.target.value)} placeholder="Buscar" />
        </div>
    )
}