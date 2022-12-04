function Validator(instance, connection) {
  const sourceNodeLevel = instance.getNode(connection.source).data.sType;
  const targetNodeLevel = instance.getNode(connection.target).data.sType;

  // console.log(sourceNodeLevel);
  // console.log(targetNodeLevel);

  if (targetNodeLevel >= sourceNodeLevel) {
    console.log("false");
    return false;
  }
  console.log("true");
  return true;
}

export default Validator;
