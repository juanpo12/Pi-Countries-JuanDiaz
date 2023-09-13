export const validateForm = (input, setErrors) => {
  const newErrors = {
      nombre: "",
      dificultad: "",
      duracion: "",
      temporada: "",
      paises: "",
  };

  if (input.nombre === "") {
      newErrors.nombre = "El nombre no puede estar vacío.";
  }

  if (input.duracion > 8 || input.duracion < 1) {
      newErrors.duracion = "La duración no puede exceder las 8 horas o ser un valor inválido.";
  }

  if (Array.isArray(input.temporada) && input.temporada.length === 0) {
      newErrors.temporada = "Debe seleccionar al menos una temporada.";
  }

  if (Array.isArray(input.paises) && input.paises.length === 0) {
      newErrors.paises = "Debe seleccionar al menos un país.";
  }

  const isValid = !Object.values(newErrors).some(error => error !== "");

  // Actualiza los errores
  setErrors(newErrors);

  // Devuelve si el formulario es válido o no
  return isValid;
};


export const disableButton = (activityData, setIsFormValid) => {
  if (activityData.nombre !== "" && activityData.duracion > 0 && activityData.dificultad > 0 && activityData.temporada.length > 0 && activityData.paises.length > 0) {
    setIsFormValid(true)
  } else {
    setIsFormValid(false)
  }
}