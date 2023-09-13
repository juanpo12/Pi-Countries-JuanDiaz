
// export const validateForm = (input, setErrors) => {
//   const newErrors = {
//     nombre: "",
//     dificultad: "",
//     duracion: "",
//     temporada: "",
//     paises: "",
//   };

//   if (input.nombre === "") {
//     newErrors.nombre = "El nombre no puede estar vacío.";
//   }

//   if (input.duracion > 8 || input.duracion < 1) {
//     newErrors.duracion = "La duración no puede exceder las 8 horas o ser un valor inválido.";
//   }
//   if (input.temporada.length === 0) {
//     newErrors.temporada = "Debe seleccionar al menos una temporada.";
//   }

//   if (input.paises.length === 0) {
//     newErrors.paises = "Debe seleccionar al menos un país.";
//   }

//   return setErrors(newErrors);
  

// };


export const disableButton = (activityData, setIsFormValid) => {
  if (activityData.nombre !== "" && activityData.duracion > 0 && activityData.dificultad > 0 && activityData.temporada.length > 0 && activityData.paises.length > 0) {
    setIsFormValid(true)
  } else {
    setIsFormValid(false)
  }
}