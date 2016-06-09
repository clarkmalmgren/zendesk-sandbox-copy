#! /bin/bash
# Workaround for https://github.com/angular/material2/issues/541

if [[ "$OSTYPE" == "darwin"* ]]; then
  find node_modules/\@angular2-material/ -name "*.js" -exec sed -i "" 's/\/\/# sourceMappingURL=.*\//\/\/# sourceMappingURL=/' {} \;
else
  find node_modules/\@angular2-material/ -name "*.js" -exec sed -i 's/\/\/# sourceMappingURL=.*\//\/\/# sourceMappingURL=/' {} \;
fi
