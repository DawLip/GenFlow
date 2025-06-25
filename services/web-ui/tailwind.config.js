/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/**/*.{js,ts,jsx,tsx,mdx}', // jeśli używasz wspólnych komponentów
  ],
  theme: {
    extend: {
      colors: {
        'bg_node': '#747070',
        'bg_node_header': '#B1AFAF',
        'on_node_header': '#ACA8A8',
        'node_border': 'rgba(177, 175, 175, 0.8)', 
        'bg': '#05010A',
        'on_bg': 'rgba(241, 231, 254, 0.8)', 
        'br': '#24202A',
        'bg_icon': 'rgba(241, 231, 254, 0.5)', 
        'bg_icon_selected': 'rgba(152, 80, 246, 0.6)', 
        'on_node_body': 'rgba(241, 231, 254, 0.8)', 
        'bg_workspace': '#0F0B14',
        'on_bg_gray': 'rgba(241, 231, 254, 0.5)', 
        
        
        'primary': '#9850F6',
        'primary-tint': 'rgba(152, 80, 246, 0.3)', 
        'triadic1': '#F69850',
        'triadic2': '#50F698',
        'analogues1': '#EB50F6',
        'analogues2': '#505BF6',
        'primary_shadow': '#380679'
      },
    },
  },
  plugins: [],
}
