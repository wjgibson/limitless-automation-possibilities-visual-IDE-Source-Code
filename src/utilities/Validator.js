let testingFlag = false;

function setTestingFlag(bool) {
  testingFlag = bool;
  console.log(`new testing flag value is ${testingFlag}`);
}

function Validator(instance, connection) {
  let sourceNodeLevel;
  let targetNodeLevel;

  //if test: bypass reactflow specific code
  if (testingFlag) {
    sourceNodeLevel = instance.sourceNodeLevel;
    targetNodeLevel = instance.targetNodeLevel;
  }
  //if not test: execute code in production form
  else {
    console.log(instance.getNode(connection.source).data.type);
    sourceNodeLevel = instance.getNode(connection.source).data.type;
    targetNodeLevel = instance.getNode(connection.target).data.type;
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
module.exports = {
  Validator,
  setTestingFlag,
};
