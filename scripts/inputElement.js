const inputElements = document.querySelectorAll(".input-element")

if (inputElements.length > 0) {
  for (const inputElement of inputElements) {
    const input = inputElement.querySelector("input")

    input.addEventListener("focus", (event) => handleInputFocus(inputElement))
    input.addEventListener("blur", (event) =>
      handleInputBlur(inputElement, event)
    )

  }

  function handleInputFocus(element) {
    element.classList.add("_active")
  }

  function handleInputBlur(element, event) {
    const value = event.target.value

    if (value === "") element.classList.remove("_active")
  }
}
