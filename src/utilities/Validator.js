function Validator(instance, connection) {
  const sourceNodeLevel = instance.getNode(connection.source).data.seqType;
  const targetNodeLevel = instance.getNode(connection.target).data.seqType;

  if (targetNodeLevel >= sourceNodeLevel) {
    return false;
  }
  return true;
}

export default Validator;
