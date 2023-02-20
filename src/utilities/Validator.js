let testingFlag = false;

function setTestingFlag(bool) {
  testingFlag = bool;
  console.log(`new testing flag value is ${testingFlag}`);
}

function Validator(instance, connection) {
  let sourceNodeLevel;
  let targetNodeLevel;
  console.log(
    `instance: ${JSON.stringify(instance.getNode(connection.source))}`
  );
  console.log(`connection: ${JSON.stringify(connection)}`);
  if (!testingFlag) {
    sourceNodeLevel = instance
      .getNode(connection.source)
      .data.type.split("|")[1];
    targetNodeLevel = instance
      .getNode(connection.target)
      .data.type.split("|")[1];
  }
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
