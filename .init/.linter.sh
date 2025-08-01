#!/bin/bash
cd /home/kavia/workspace/code-generation/student-collaboration-hub-141072-38888/student_admin_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

