function Validator(instance, connection) {
  const sourceNodeLevel = instance
    .getNode(connection.source)
    .data.type.split("|")[1];
  const targetNodeLevel = instance
    .getNode(connection.target)
    .data.type.split("|")[1];

  console.log(targetNodeLevel);
  if (targetNodeLevel == 1) {
    if (sourceNodeLevel == 2) {
      return true;
    } else {
      return false;
    }
  } else if (targetNodeLevel >= sourceNodeLevel) {
    return false;
  }
  return true;
}

export default Validator;
