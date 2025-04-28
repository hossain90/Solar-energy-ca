# Solar Energy Calculator (California)

A sophisticated web application built with React and TypeScript that helps users calculate their solar energy needs and potential savings. The application provides both basic and professional calculation modes to cater to different user needs.

## Features

### Current Implementation
- **Interactive Solar Calculator**
  - Basic and Professional calculation modes
  - Daily consumption estimation
  - Location-based calculations with map integration
  - Battery backup options
  - Panel efficiency customization
  - Multi-currency support

- **Advanced Features**
  - Custom location selection via interactive map
  - Real-time calculations
  - Detailed cost breakdowns
  - Savings and payback period estimates
  - Professional PDF report generation
  - Google Sheets integration for data storage

- **User Experience**
  - Responsive design
  - Interactive visualization with energy animations
  - Error handling and validation
  - Professional/Free mode toggle
  - Detailed results dashboard

## Planned Improvements

### High Priority
1. **Data Accuracy Enhancement**
   - [ ] Integrate real-time solar irradiance data API
   - [ ] Add more detailed location-specific parameters
   - [ ] Implement more sophisticated energy consumption patterns

2. **User Experience**
   - [ ] Add loading states during calculations
   - [ ] Implement form validation with detailed feedback
   - [ ] Add tooltips explaining technical terms
   - [ ] Improve mobile responsiveness

3. **Calculation Features**
   - [ ] Add support for different panel types and specifications
   - [ ] Include shading analysis
   - [ ] Add seasonal variation calculations
   - [ ] Implement roof orientation and tilt angle inputs

### Medium Priority
1. **Analytics and Reporting**
   - [ ] Enhanced PDF report customization
   - [ ] Add comparative analysis with similar installations
   - [ ] Implement historical data tracking
   - [ ] Add export options (CSV, Excel)

2. **Integration**
   - [ ] Add support for more payment gateways
   - [ ] Implement user accounts and saved calculations
   - [ ] Add CRM integration for quote follow-ups
   - [ ] Integrate with utility company APIs for real consumption data

3. **Technical Debt**
   - [ ] Implement comprehensive test coverage
   - [ ] Add E2E testing
   - [ ] Optimize performance for large calculations
   - [ ] Implement proper error boundary handling

### Future Enhancements
1. **Advanced Features**
   - [ ] 3D roof modeling for precise panel placement
   - [ ] AI-powered consumption prediction
   - [ ] Real-time monitoring integration
   - [ ] Mobile app development

2. **Community Features**
   - [ ] User reviews and ratings
   - [ ] Community comparison tools
   - [ ] Installer marketplace
   - [ ] Solar education resources

## Technical Stack
- React
- TypeScript
- Tailwind CSS
- Vite
- Google Sheets API
- Lucide Icons
- Jest for testing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Cloud Platform account (for Sheets API)

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/Solar-energy-ca.git
cd Solar-energy-ca
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

## Contributing
Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, please open an issue in the GitHub repository or contact our support team.