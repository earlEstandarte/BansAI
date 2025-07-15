// This script will add a 'stages' array to every topic in both coding_lessons and digital_literacy_lessons.
// For each topic:
// - lecture: uses topic.description and a placeholder trivia
// - quiz: placeholder question about the topic
// - recap: uses topic.description as summary
// - game: uses first mini-game/info resource if available, else placeholder

function addStagesToTopics(lessons) {
  return lessons.map(lesson => ({
    ...lesson,
    topics: lesson.topics.map(topic => {
      // If already has stages, skip
      if (topic.stages) return topic;
      // Find first mini-game or info resource
      let gameResource = topic.resources?.find(r => r.type === 'mini-game' || r.type === 'info');
      return {
        ...topic,
        stages: [
          {
            type: 'lecture',
            content: {
              text: topic.description || 'Learn about this topic.',
              trivia: `Did you know? ${topic.title} is important for this lesson!`
            }
          },
          {
            type: 'quiz',
            content: {
              questions: [
                {
                  question: `What is the main idea of ${topic.title}?`,
                  options: ['It is important', 'It is not important', 'It is unrelated'],
                  answer: 'It is important'
                }
              ]
            }
          },
          {
            type: 'recap',
            content: {
              summary: topic.description || 'This topic is essential.'
            }
          },
          {
            type: 'game',
            content: gameResource
              ? { gameType: gameResource.type, file: gameResource.file || gameResource.url || 'N/A' }
              : { gameType: 'mini-game', file: 'N/A' }
          }
        ]
      };
    })
  }));
}

export const coding_lessons = addStagesToTopics([
    {
        stage: 'Introduction to Web Development',
        description: 'Learn the fundamentals, logic, and structure of web development.',
        topics: [
            {
                title: 'Pseusocode Basics',
                description: 'Understand the logic and structure of programming with pseudocode.',
                resources: [
                    { type: 'mini-game', file: 'pseudocode_game.jsx' },
                    { type: 'video', url: 'https://example.com/pseudocode-video' },
                ]
            },
            {
                title: 'Difference between frontend and backend',
                description: 'Learn the roles of frontend and backend in web development.',
                resources: [
                    { type: 'mini-game', url: 'quiz_game.jsx' },
                    { type: 'article', url: 'https://example.com/css-article' }
                ]
            },
            {
                title: 'Logic Gates',
                description: 'Understand the basic logic gates used in programming.',
                resources: [
                    { type: 'mini-game', file: 'logic_gates_game.jsx' },
                    { type: 'video', url: 'https://example.com/logic-gates-video' }
                ]
            }
        ]
    },
    {
        stage: 'HTML Basics',
        description: 'Learn the basics of HTML, the structure of web pages.',
        topics: [
            {
                title: 'HTML Elements',
                description: 'Understand the basic elements of HTML and how to use them.',
                resources: [
                    { type: 'mini-game', file: 'html_elements_game.jsx' },
                    { type: 'video', url: 'https://example.com/html-elements-video' }
                ]
            },
            {
                title: 'HTML Attributes',
                description: 'Learn about attributes in HTML and how to use them effectively.',
                resources: [
                    { type: 'mini-game', file: 'html_attributes_game.jsx' },
                    { type: 'article', url: 'https://example.com/html-attributes-article' }
                ]
            }
        ]
    },
    {
        stage: 'CSS Basics',
        description: 'Learn the basics of CSS, the styling language for web pages.',
        topics: [
            {
                title: 'CSS Selectors',
                description: 'Understand how to select and style HTML elements with CSS.',
                resources: [
                    { type: 'mini-game', file: 'css_selectors_game.jsx' },
                    { type: 'video', url: 'https://example.com/css-selectors-video' }
                ]
            },
            {
                title: 'CSS Box Model',
                description: 'Learn about the CSS box model and how it affects layout.',
                resources: [
                    { type: 'mini-game', file: 'css_box_model_game.jsx' },
                    { type: 'article', url: 'https://example.com/css-box-model-article' }
                ]
            }
        ]
    },
    {
        stage: 'Simple Portfolio Website',
        description: 'Apply your HTML and CSS skills to create a simple portfolio website.',
        topics: [
            {
                title: 'Portfolio Structure',
                description: 'Learn how to structure your portfolio website using HTML.',
                resources: [
                    { type: 'info', file: 'portfolio_structure.jsx' },
                    { type: 'video', url: 'https://example.com/portfolio-structure-video' }
                ]
            },
            {
                title: 'Styling with CSS',
                description: 'Apply CSS styles to enhance the appearance of your portfolio.',
                resources: [
                    { type: 'info', file: 'portfolio_css.jsx' },
                    { type: 'article', url: 'https://example.com/portfolio-css-article' }
                ]
            }
        ]
    },
    {
        stage: 'JavaScript Basics',
        description: 'Learn the basics of JavaScript, the programming language for web development.',
        topics: [
            {
                title: 'JavaScript Syntax',
                description: 'Understand the basic syntax and structure of JavaScript.',
                resources: [
                    { type: 'mini-game', file: 'js_syntax_game.jsx' },
                    { type: 'video', url: 'https://example.com/js-syntax-video' }
                ]
            },
            {
                title: 'Variables and Data Types',
                description: 'Learn about variables and different data types in JavaScript.',
                resources: [
                    { type: 'mini-game', file: 'js_variables_game.jsx' },
                    { type: 'article', url: 'https://example.com/js-variables-article' }
                ]
            }
        ]
    },
    {
        stage: 'JavaScript Advanced',
        description: 'Dive deeper into JavaScript with advanced topics.',
        topics: [
            {
                title: 'Functions and Scope',
                description: 'Understand how functions work and the concept of scope in JavaScript.',
                resources: [
                    { type: 'mini-game', file: 'js_functions_game.jsx' },
                    { type: 'video', url: 'https://example.com/js-functions-video' }
                ]
            },
            {
                title: 'DOM Manipulation',
                description: 'Learn how to manipulate the Document Object Model (DOM) with JavaScript.',
                resources: [
                    { type: 'mini-game', file: 'js_dom_game.jsx' },
                    { type: 'article', url: 'https://example.com/js-dom-article' }
                ]
            }
        ]
    },
    {
        stage: 'Build your own Web Application',
        description: 'Apply your JavaScript skills to create a simple web application.',
        topics: [
            {
                title: 'Building the Web Application',
                description: 'Learn how to structure your web application using HTML, CSS, and JavaScript.',
                resources: [
                    { type: 'info', file: 'web_app_structure.jsx' },
                ]
            },
        ]
    }
])

export const digital_literacy_lessons = addStagesToTopics([
    {
        stage: 'Digital Foundations',
        description: 'Learn the basics of digital literacy, including online safety and digital communication.',
        topics: [
            {
                title: 'Online Safety',
                description: 'Understand the importance of online safety and how to protect yourself online.',
                resources: [
                    { type: 'info', file: 'online_safety.jsx' },
                    { type: 'video', url: 'https://example.com/online-safety-video' }
                ]
            }
        ]
    },
    {
        stage: 'Productivity & Everyday Tech Skills',
        description: 'Learn how to use everyday technology tools to enhance productivity.',
        topics: [
            {
                title: 'Using Productivity Tools',
                description: 'Understand how to use tools like Google Docs, Sheets, and Slides for productivity.',
                resources: [
                    { type: 'info', file: 'productivity_tools.jsx' },
                    { type: 'video', url: 'https://example.com/productivity-tools-video' }
                ]
            }
        ]
    },
    {
        stage: 'Collaboration & Creation',
        description: 'Learn how to collaborate and create content using digital tools.',
        topics: [
            {
                title: 'Collaborative Tools',
                description: 'Understand how to use tools like Google Drive and Trello for collaboration.',
                resources: [
                    { type: 'info', file: 'collaborative_tools.jsx' },
                    { type: 'video', url: 'https://example.com/collaborative-tools-video' }
                ]
            },
            {
                title: 'Creating Digital Content',
                description: 'Learn how to create digital content using tools like Canva and Adobe Spark.',
                resources: [
                    { type: 'info', file: 'digital_content_creation.jsx' },
                    { type: 'video', url: 'https://example.com/digital-content-creation-video' }
                ]
            }
        ]
    },
    {
        stage: 'Critical & Applied Use',
        description: 'Learn how to critically evaluate and apply digital tools in real-world scenarios.',
        topics: [
            {
                title: 'Evaluating Digital Tools',
                description: 'Understand how to critically evaluate digital tools and their applications.',
                resources: [
                    { type: 'info', file: 'evaluating_digital_tools.jsx' },
                    { type: 'video', url: 'https://example.com/evaluating-digital-tools-video' }
                ]
            },
            {
                title: 'Applying Digital Skills',
                description: 'Learn how to apply your digital skills in real-world scenarios.',
                resources: [
                    { type: 'info', file: 'applying_digital_skills.jsx' },
                    { type: 'video', url: 'https://example.com/applying-digital-skills-video' }
                ]
            }
        ]
    },
    {
        stage: 'Media Content Creation',
        description: 'Learn how to create and share media content using digital tools.',
        topics: [
            {
                title: 'Creating Media Content',
                description: 'Understand how to create media content using tools like video editors and graphic design software.',
                resources: [
                    { type: 'info', file: 'media_content_creation.jsx' },
                    { type: 'video', url: 'https://example.com/media-content-creation-video' }
                ]
            },
            {
                title: 'Sharing Media Content',
                description: 'Learn how to share your media content effectively on various platforms.',
                resources: [
                    { type: 'info', file: 'sharing_media_content.jsx' },
                    { type: 'video', url: 'https://example.com/sharing-media-content-video' }
                ]
            }
        ]
    },
    {
        stage: 'Online Communication & Leadership',
        description: 'Learn how to communicate effectively online and develop leadership skills in digital spaces.',
        topics: [
            {
                title: 'Effective Online Communication',
                description: 'Understand the principles of effective online communication and how to apply them.',
                resources: [
                    { type: 'info', file: 'online_communication.jsx' },
                    { type: 'video', url: 'https://example.com/online-communication-video' }
                ]
            },
            {
                title: 'Digital Leadership',
                description: 'Learn how to lead and inspire others in digital spaces.',
                resources: [
                    { type: 'info', file: 'digital_leadership.jsx' },
                    { type: 'video', url: 'https://example.com/digital-leadership-video' }
                ]
            }
        ]
    }
])