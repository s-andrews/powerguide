import tempfile
import os
import shutil
import subprocess
import shlex

# Set some global preferences

template_dir = os.path.dirname(os.path.realpath(__file__))+"/../R/"
pandoc_location = "/usr/lib/rstudio/bin/pandoc"
path = "/usr/bin:/bin"


# Set some environment variables which will otherwise cause things
# to complain

os.environ["HOME"] = template_dir
os.environ["PATH"] = path


def run_analysis (template,variables):

	# Make a temporary directory, copy the template to it
	# applying the substitutions we need, run the template
	# and then send the output back on STDOUT


	# Find the template
	template_text = ""

	with open(template) as file:
		template_text = file.read() 


	# Create a temporary working space
	tempDir = tempfile.TemporaryDirectory()

	# Write the template to this directory
	with open(tempDir.name+"/script.Rmd","w") as file:
		file.write(template_text.format(**variables))

	# Copy over all of the png files from the template directory
	for file in os.listdir(template_dir):
		if file[-4:] == ".png":
			shutil.copyfile(template_dir+"/"+file,tempDir.name+"/"+file)


	# Run the render command
	subprocess.call(shlex.split("Rscript -e 'Sys.setenv(RSTUDIO_PANDOC=\"{pandoc}\") ; rmarkdown::render(\"{dir}/script.Rmd\", quiet=TRUE, output_file=\"{dir}/output.html\")'".format(pandoc=pandoc_location,dir=tempDir.name)))
	
	# Read and output the HTML

	print ("Content-type: text/html\n")

	with open(tempDir.name+"/output.html") as file:
		print(file.read())


	# Clean up
	tempDir.cleanup()



if (__name__ == "__main__"):

	template = template_dir+"2_sample_continuous.Rmd"

	run_analysis(template,{"power":0.8,"significance":0.05,"difference":10,"variance":5})

