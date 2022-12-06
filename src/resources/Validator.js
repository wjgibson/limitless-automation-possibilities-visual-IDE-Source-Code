function Validator(instance, connection) {
  const sourceNodeLevel = instance.getNode(connection.source).data.seqType;
  const targetNodeLevel = instance.getNode(connection.target).data.seqType;

  console.log(sourceNodeLevel);
  console.log(targetNodeLevel);

  if (targetNodeLevel >= sourceNodeLevel) {
    console.log("false");
    return false;
  }
  console.log("true");
  return true;
}

export default Validator;
