function selectToolEventListener({ toolElement, toolsList, canvas }) {
  toolElement.addEventListener("click", () => {
    const toolInstance = [...canvas.tools].find(
      (t) => t.name === toolElement.id
    );
    if (canvas.tool !== toolInstance) {
      canvas.tool = toolInstance;
      toolElement.classList.add("tool-list-selected");
      const otherList = [...toolsList].filter((t) => t !== toolElement);
      for (const other of otherList) {
        other.classList.remove("tool-list-selected");
      }
    } else {
      canvas.tool = null;
      toolElement.classList.remove("tool-list-selected");
    }
  });
}

export { selectToolEventListener };
