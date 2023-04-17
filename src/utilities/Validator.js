let testingFlag = false;

function setTestingFlag(bool) {
  testingFlag = bool;
}

function Validator(instance, connection, list) {
  let sourceNodeLevel;
  let targetNodeLevel;

  //if test: bypass reactflow specific code
  if (testingFlag) {
    sourceNodeLevel = instance.sourceNodeLevel;
    targetNodeLevel = instance.targetNodeLevel;
  }
  //if not test: execute code in production form
  else {
    sourceNodeLevel = instance
      .getNode(connection.source)
      .data.type.split("|")[1];
    targetNodeLevel = instance
      .getNode(connection.target)
      .data.type.split("|")[1];
    targetNodeType = instance.getNode(connection.target).data.nodeType;
  }

  if (targetNodeType == "Control Module") {
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
module.exports = {
  Validator,
  setTestingFlag,
};
