import React from "react";
import "../css/ModalEditTutoria.css";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          <main className="h-screen bg-dark-blue overflow-hidden grid grid-cols-1 md:grid-cols-2 md:items-center">
            <section className="grid justify-items-center gap-y-8">
              <Calendar2CheckFill size={80} fill="yellow" />
              <h1 className="text-white text-5xl md:mb-8 mt-4">
                Agendar tutoria
              </h1>
              <ListAddedStudents newTutoria={newTutoria} />
            </section>
            <section className="grid justify-items-center md:gap-y-12">
              <h2 className="text-3xl text-white border-b">
                Información de la tutoria
              </h2>
              <form
                onSubmit={handleSubmit}
                className="md:w-1/2"
                id="formNewTutoria"
              >
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="date"
                    name="fecha"
                    id="dateTutoria"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={handleInputChange}
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="dateTutoria"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Fecha
                  </label>
                </div>
                <div className="grid grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="time"
                      name="hora_inicio"
                      id="horaInicio"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      min="07:00"
                      max="22:00"
                      onChange={handleInputChange}
                      required
                    />
                    <label
                      htmlFor="horaInicio"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Inicio
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="time"
                      name="hora_fin"
                      id="horaFinal"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      min={newTutoria.startTime}
                      max="22:00"
                      onChange={handleInputChange}
                      required
                    />
                    <label
                      htmlFor="horaFinal"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Finalización
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="estudiante"
                      id="estudianteTutoria"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      onKeyDown={handleKeyDown}
                      maxLength={12}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="estudianteTutoria"
                      className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Identificación del estudiante
                    </label>
                  </div>
                  <SuggestedStudents estudiante={newTutoria.estudiante} />
                </div>
                {dataLoader.isAdministrator ? (
                  <div className="grid grid-cols-1 md:gap-6">
                    <SelectDocentesTutorias
                      data={dataLoader.docentes.datos}
                      setDataDocente={setDataDocente}
                      handleInputChange={handleInputChange}
                    />
                    <div className="grid grid-cols-2 justify-center items-center md:gap-6">
                      <SelectAsignaturasCurrentUser
                        userInfo={dataDocente}
                        handleInputChange={handleInputChange}
                      />
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="tema_desarrollar"
                          id="tema_desarrollar"
                          onChange={handleInputChange}
                          placeholder=""
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                          htmlFor="tema_desarrollar"
                          className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Tema a desarrollar
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 justify-center items-center md:gap-6">
                    <SelectAsignaturasCurrentUser
                      userInfo={userInfo}
                      handleInputChange={handleInputChange}
                    />
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="tema_desarrollar"
                        id="tema_desarrollar"
                        onChange={handleInputChange}
                        placeholder=""
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="tema_desarrollar"
                        className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Tema a desarrollar
                      </label>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-x-2">
                  <button
                    onClick={addStudenToArray}
                    className="focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm md:px-5 px-4 py-2.5 bg-yellow-300 hover:bg-yellow-400 text-black border-gray-700"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="col-span-2 text-white focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base md:px-5 px-16 py-2.5 bg-blue-700 hover:bg-blue-800 border-gray-700"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Modal;