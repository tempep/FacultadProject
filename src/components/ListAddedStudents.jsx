import React from "react";
import { PersonCircle } from "react-bootstrap-icons";

export default function ListAddedStudents({ newTutoria }) {

  return (
    <main>
      {newTutoria.estudiantes[0] && (
        <div className="w-full max-w-md p-4 rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
          <h2 className="text-xl font-bold text-yellow-300">
            Estudiantes añadidos
          </h2>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 sm:p-8 bg-gray-800 border-gray-700">
              {newTutoria.estudiantes.map((item, index) => (
                <li key={index} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <PersonCircle size={20} className="w-8 h-8 rounded-full" fill="white"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white">{item}</p>
                  </div>
                    </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
