import tempfile
import os
import shutil
import subprocess
import shlex
import cgi
import sys

# For development only
import cgitb
cgitb.enable()

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
	sys.stdout.buffer.write(b"Content-Type: text/html\n\n")

	with open(tempDir.name+"/output.html","rb") as file:
		sys.stdout.buffer.write(file.read())

	# Clean up
	tempDir.cleanup()



if (__name__ == "__main__"):

	# Read in the options from the web server
	options = cgi.FieldStorage()

	# We need to figure out what template we're going to use,
	# and what options we need to pass on to the template to
	# generate the correct report.

	if options["type"].value == "Continuous" and options["groups"].value == "2" and options["normal"].value == "Yes":
		template = template_dir+"2_sample_continuous.Rmd"		

		field_values = {"power": options["power"].value,"significance": options["significance"].value, "difference": options["effect_size"].value, "variance": options["variance"].value}

		run_analysis(template,field_values)

	elif options["type"].value == "Continuous" and options["groups"].value == "1" and options["normal"].value == "Yes":
		template = template_dir+"1_sample_continuous.Rmd"		

		field_values = {"power": options["power"].value,"significance": options["significance"].value, "difference": options["effect_size"].value, "variance": options["variance"].value}

		run_analysis(template,field_values)


	elif options["type"].value == "Continuous" and options["groups"].value[:1] == "3" and options["normal"].value == "Yes":
		template = template_dir+"3_sample_continuous.Rmd"		

		field_values = {"group_number": options["group_number"].value, "variance_between":options["variance_between"].value, "power": options["power"].value,"significance": options["significance"].value, "difference": options["effect_size"].value, "variance": options["variance"].value}

		run_analysis(template,field_values)


	elif options["type"].value == "Categorical" and options["groups"].value == "2" :
		template = template_dir+"2_sample_categorical.Rmd"		

		field_values = {"power": options["power"].value,"significance": options["significance"].value, "start_proportion": options["start_proportion"].value, "end_proportion": options["end_proportion"].value}

		run_analysis(template,field_values)

	else:

		print ("Content-type: text/plain\n")
		print ("Not supported yet...")
		print(options["type"].value)



#	template = template_dir+"2_sample_continuous.Rmd"

#	run_analysis(template,{"power":0.8,"significance":0.05,"difference":10,"variance":5})

