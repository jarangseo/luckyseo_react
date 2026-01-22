const fs = require('fs');
const path = require('path');

// kebab-case를 PascalCase로 변환
function kebabToPascal(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// 컴포넌트 JSX 템플릿
function getComponentTemplate(componentName, pascalName) {
  return `import "./${componentName}.styles.scss";

const ${pascalName} = () => {
  return (
    <div className="${componentName}-container">
      {/* Your component content here */}
    </div>
  );
};

export default ${pascalName};
`;
}

// 스타일 SCSS 템플릿
function getStyleTemplate(componentName) {
  return `.${componentName}-container {
  /* Your styles here */
}
`;
}

// 메인 함수
function createComponent(parentFolder, componentName) {
  if (!componentName) {
    console.error('❌ 컴포넌트 이름을 입력해주세요.');
    console.log('사용법: npm run create-comp <component-name>');
    console.log('또는: npm run create-comp <parent-folder> <component-name>');
    console.log('예시: npm run create-comp routes my-page');
    console.log('예시: npm run create-comp components my-button (또는 npm run create-comp my-button)');
    process.exit(1);
  }

  // 기본값은 components
  const defaultParentFolder = 'components';
  const actualParentFolder = parentFolder || defaultParentFolder;

  const parentDir = path.join(__dirname, '../src', actualParentFolder);
  const componentDir = path.join(parentDir, componentName);
  const pascalName = kebabToPascal(componentName);

  // 상위 디렉토리가 존재하는지 확인
  if (!fs.existsSync(parentDir)) {
    console.error(`❌ ${actualParentFolder} 디렉토리가 존재하지 않습니다.`);
    console.log(`📁 경로: ${parentDir}`);
    process.exit(1);
  }

  // 디렉토리가 이미 존재하는지 확인
  if (fs.existsSync(componentDir)) {
    console.error(`❌ ${componentName} 폴더가 이미 존재합니다.`);
    process.exit(1);
  }

  try {
    // 폴더 생성
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`✅ ${componentName} 폴더 생성 완료`);

    // component.jsx 파일 생성
    const componentFile = path.join(componentDir, `${componentName}.component.jsx`);
    fs.writeFileSync(componentFile, getComponentTemplate(componentName, pascalName));
    console.log(`✅ ${componentName}.component.jsx 파일 생성 완료`);

    // styles.scss 파일 생성
    const styleFile = path.join(componentDir, `${componentName}.styles.scss`);
    fs.writeFileSync(styleFile, getStyleTemplate(componentName));
    console.log(`✅ ${componentName}.styles.scss 파일 생성 완료`);

    console.log(`\n🎉 ${componentName} 컴포넌트 생성이 완료되었습니다!`);
    console.log(`📁 위치: src/${actualParentFolder}/${componentName}/`);
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
// 인자가 2개면: <parent-folder> <component-name>
// 인자가 1개면: <component-name> (기본값: components)
const args = process.argv.slice(2);
if (args.length === 2) {
  createComponent(args[0], args[1]);
} else if (args.length === 1) {
  createComponent(null, args[0]);
} else {
  createComponent(null, null);
}
