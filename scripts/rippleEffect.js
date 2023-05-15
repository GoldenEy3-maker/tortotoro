const rippleElements = document.querySelectorAll("[data-ripple]")

if (rippleElements.length > 0) {
  const animationDuration = 600
  const minAnimationDuration = 200

  for (const rippleElement of rippleElements) {
    rippleElement.addEventListener("pointerdown", handleRippleEffect)
  }

  function handleRippleEffect(event) {
    const target = event.currentTarget
    const insideInteractionNodes = target.querySelectorAll("button, input, a")

    if (insideInteractionNodes.length) {
      const isClickedOnInteractionNodes = Array.from(
        insideInteractionNodes
      ).some((node) => event.taget.closest(node.tagName))

      if (isClickedOnInteractionNodes) return
    }

    const diameter = Math.max(target.clientWidth, target.clientHeight)
    const radius = diameter / 2

    const x = event.clientX - target.getBoundingClientRect().left - radius
    const y = event.clientY - target.getBoundingClientRect().top - radius

    const rippleSpan = document.createElement("span")

    rippleSpan.style.animationDuration = animationDuration + "ms"
    rippleSpan.style.left = x + "px"
    rippleSpan.style.top = y + "px"
    rippleSpan.style.width = rippleSpan.style.height = diameter + "px"

    rippleSpan.classList.add("ripple-element")
    rippleSpan.dataset.rippleElement = "true"

    target.insertBefore(rippleSpan, target.firstChild)

    const animationStart = Date.now()

    function handleFadeOutRipple() {
      const animationInterrupt = Date.now()
      let remainingTime =
        animationDuration - (animationInterrupt - animationStart)

      if (remainingTime < minAnimationDuration)
        remainingTime = minAnimationDuration
      rippleSpan.style.opacity = "0"
      rippleSpan.style.transition = `opacity ${remainingTime}ms linear`

      setTimeout(() => {
        rippleSpan.remove()
      }, remainingTime)

      target.removeEventListener("pointerup", handleFadeOutRipple)
      target.removeEventListener("pointercancel", handleFadeOutRipple)
      target.removeEventListener("pointerleave", handleFadeOutRipple)
    }

    target.addEventListener("pointerup", handleFadeOutRipple)
    target.addEventListener("pointercancel", handleFadeOutRipple)
    target.addEventListener("pointerleave", handleFadeOutRipple)
  }
}
