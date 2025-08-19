require 'xcodeproj'

# Open the Xcode project
project_path = 'EnergyRaiseNew.xcodeproj'
project = Xcodeproj::Project.open(project_path)

# Find the main target
target = project.targets.first

# Find the main group
main_group = project.main_group.find_subpath('EnergyRaiseNew')

# Add the GoogleService-Info.plist file reference
file_ref = main_group.new_file('../GoogleService-Info.plist')

# Add file to the build phase
resources_build_phase = target.resources_build_phase
resources_build_phase.add_file_reference(file_ref)

# Save the project
project.save
