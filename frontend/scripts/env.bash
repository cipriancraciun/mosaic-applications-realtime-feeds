#!/dev/null

_workbench="$( readlink -e -- . )"
_scripts="${_workbench}/scripts"
_tools="${_workbench}/.tools"
_outputs="${_workbench}/../.outputs"

_PATH="${_tools}/bin:${PATH}"

_java="$( PATH="${_PATH}" type -P -- java || true )"
if test -z "${_java}" ; then
	echo "[ww] missing \`java\` (Java interpreter) executable in path: \`${_PATH}\`; ignoring!" >&2
	_java=java
fi

_mvn="$( PATH="${_PATH}" type -P -- mvn || true )"
if test -z "${_mvn}" ; then
	echo "[ww] missing \`mvn\` (Java Maven tool) executable in path: \`${_PATH}\`; ignoring!" >&2
	_mvn=mvn
fi

_java_args=()
_java_env=(
	PATH="${_PATH}"
)

_mvn_args=()
_mvn_env=(
	PATH="${_PATH}"
)
